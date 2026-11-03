require('dotenv').config();

const crypto = require('node:crypto');
const fs = require('node:fs');

const YOTI_AUTH_URL = 'https://auth.api.yoti.com/v1/oauth/token';
const YOTI_AGE_SANDBOX_API = 'https://age.yoti.com/sandbox/api/v1';
const AFFIXIO_API = 'https://api.affix-io.com';
const AGE_THRESHOLD = 18;

const {
  YOTI_CLIENT_SDK_ID,
  YOTI_KEY_FILE_PATH,
  AFFIXIO_API_KEY,
} = process.env;

// Age the sandbox should pretend the user is. Try `npm start -- 16` to see the "no" path.
const mockAge = Number(process.argv[2] || 21);

function requireConfig() {
  const missing = ['YOTI_CLIENT_SDK_ID', 'YOTI_KEY_FILE_PATH', 'AFFIXIO_API_KEY']
    .filter((name) => !process.env[name]);
  if (missing.length) {
    throw new Error(`Missing configuration: ${missing.join(', ')}. See .env.example`);
  }
}

function base64url(input) {
  return Buffer.from(input).toString('base64url');
}

// Build a PS384 signed JWT (private_key_jwt), as described in the Yoti Age Verification docs.
function buildClientAssertion() {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'PS384', typ: 'JWT' };
  const claims = {
    iss: `sdk:${YOTI_CLIENT_SDK_ID}`,
    sub: `sdk:${YOTI_CLIENT_SDK_ID}`,
    aud: YOTI_AUTH_URL,
    jti: crypto.randomUUID(),
    iat: now,
    exp: now + 5 * 60,
  };
  const signingInput = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(claims))}`;
  const signature = crypto.sign('sha384', Buffer.from(signingInput), {
    key: fs.readFileSync(YOTI_KEY_FILE_PATH),
    padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
    saltLength: 48,
  });
  return `${signingInput}.${base64url(signature)}`;
}

async function getYotiAccessToken() {
  const response = await fetch(YOTI_AUTH_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      scope: 'avs:sessions:create',
      client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
      client_assertion: buildClientAssertion(),
    }),
  });
  if (!response.ok) {
    throw new Error(`Yoti token request failed with status ${response.status}`);
  }
  const { access_token: accessToken } = await response.json();
  return accessToken;
}

async function yotiRequest(accessToken, method, path, body) {
  const response = await fetch(`${YOTI_AGE_SANDBOX_API}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'Yoti-SDK-Id': YOTI_CLIENT_SDK_ID,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!response.ok) {
    throw new Error(`Yoti ${method} ${path} failed with status ${response.status}`);
  }
  return response.json();
}

async function affixioRequest(path, body) {
  const response = await fetch(`${AFFIXIO_API}${path}`, {
    method: 'POST',
    headers: {
      'X-API-Key': AFFIXIO_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const json = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(`AffixIO ${path} failed with status ${response.status}: ${json.error || 'unknown error'} ${json.message || ''}`.trim());
  }
  return json;
}

// Reduce the Yoti result to a single yes/no. The exact age, images and other fields are not kept.
function isOverThreshold(result) {
  if (result.status !== 'COMPLETE') {
    return false;
  }
  if (typeof result.age === 'number' && result.age > 0) {
    return result.age >= AGE_THRESHOLD;
  }
  // For "OVER" sessions, COMPLETE means the user met the threshold set when the session was created.
  return result.type === 'OVER';
}

async function main() {
  requireConfig();

  // 1. Create a Yoti Age Verification sandbox session.
  const accessToken = await getYotiAccessToken();
  const session = await yotiRequest(accessToken, 'POST', '/sessions', {
    type: 'OVER',
    ttl: 900,
    age_estimation: {
      allowed: true,
      threshold: AGE_THRESHOLD,
      level: 'PASSIVE',
      retry_limit: 1,
    },
    doc_scan: {
      allowed: true,
      threshold: AGE_THRESHOLD,
      authenticity: 'AUTO',
      level: 'PASSIVE',
      retry_limit: 1,
    },
    reference_id: `affixio-example-${crypto.randomUUID()}`,
    callback: { auto: true, url: 'https://example.com/age-check/done' },
    cancel_url: 'https://example.com/age-check/cancelled',
  });
  console.log(`Created Yoti sandbox session ${session.id}`);

  // 2. In the sandbox, mock the user completing the check instead of using the Yoti UI.
  await yotiRequest(accessToken, 'PUT', `/sessions/${session.id}/response-config`, {
    status: mockAge >= AGE_THRESHOLD ? 'COMPLETE' : 'FAIL',
    age: mockAge,
    method: 'AGE_ESTIMATION',
  });

  // 3. Fetch the result and reduce it to yes/no straight away.
  const result = await yotiRequest(accessToken, 'GET', `/sessions/${session.id}/result`);
  const over18 = isOverThreshold(result);
  const yotiReference = { session_id: result.id, evidence_id: result.evidence_id, method: result.method };
  console.log(`Yoti result: status ${result.status}, method ${result.method}, over ${AGE_THRESHOLD}: ${over18 ? 'yes' : 'no'}`);

  if (!over18) {
    console.log('No AffixIO proof issued.');
    return;
  }

  // 4. Ask AffixIO for a yes/no proof using the built-in "yesno" circuit.
  //    Only booleans are sent. No age, date of birth, image or name leaves this process.
  const proof = await affixioRequest('/v1/circuits/yesno/prove', {
    fields: {
      condition_greater1: result.status === 'COMPLETE',
      condition_greater2: over18,
      condition_greater3: Boolean(result.evidence_id),
    },
  });
  // The response also contains the raw proof bytes ("proof"). The proof ID is enough to verify it later.
  const proofId = proof.proof_id;
  if (proof.decision !== 'yes') {
    throw new Error(`AffixIO returned decision "${proof.decision}" for proof ${proofId}`);
  }
  console.log(`AffixIO over-${AGE_THRESHOLD} proof issued: ${proofId}`);

  // Store or pass on only this record: a yes/no, the proof ID and a reference back to the Yoti session.
  console.log('Record to keep:', JSON.stringify({ over18: true, affixio_proof: proofId, yoti: yotiReference }, null, 2));

  // 5. The party relying on the check (a shop, or an AI agent acting for the user) verifies the proof.
  //    Proofs are single use: verifying the same proof twice returns 409 double_spend_detected.
  const verification = await affixioRequest('/v1/circuits/yesno/verify', {
    proof: proofId,
    requestAttestation: true,
  });
  console.log('AffixIO verification:', JSON.stringify({
    decision: verification.decision,
    valid: verification.valid,
    proof_digest: verification.proof_digest,
    attestation_signed_at: verification.attestation && verification.attestation.signed_at,
  }, null, 2));
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
