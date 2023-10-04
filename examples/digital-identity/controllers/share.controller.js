const { Router } = require('express');
const {
  DigitalIdentityBuilders: {
    PolicyBuilder,
    ShareSessionConfigurationBuilder,
  },
} = require('yoti');

const config = require('../config');
const sdkDigitalIdentityClient = require('./sdk.digital.identity.client');

const router = Router();

router.get('/', (req, res) => {
  res.render('pages/share', {
    yotiClientSdkId: config.CLIENT_SDK_ID,
  });
});

router.get('/get-new-session-id', async (req, res) => {
  const { query } = req;
  const { policyType } = query;

  const policyBuilder = new PolicyBuilder();

  const CASE_RTW = 'RTW';
  const CASE_MTFIP = 'MTFIP';

  if (policyType === CASE_RTW) {
    const existingSingleIPRequirements = {
      trust_framework: 'UK_TFIDA',
      scheme: {
        type: 'RTW',
      },
    };
    policyBuilder.withIdentityProfileRequirements(existingSingleIPRequirements);
  } else if (policyType === CASE_MTFIP) {
    const newMultipleIPRequirements = {
      profiles: [
        {
          trust_framework: 'UK_TFIDA',
          schemes: [
            {
              label: 'LB912',
              type: 'RTW',
            },
            {
              label: 'LB777',
              type: 'DBS',
              objective: 'BASIC',
            },
          ],
        },
        {
          trust_framework: 'YOTI_GLOBAL',
          schemes: [
            {
              // LABEL has to be unique across all profiles not just the schemes in this list.
              label: 'LB321',
              type: 'IDENTITY',
              objective: 'AL_L1',
              config: {
                document_filter: {
                  allowlist: true, // only supported value for now is TRUE
                  documents: [
                    {
                      country_codes: [], // empty means all are accepted
                      document_types: ['PASSPORT'], // empty means all are accepted
                    },
                    {
                      country_codes: ['USA'], // empty means all are accepted
                      document_types: ['DRIVING_LICENCE', 'STATE_ID'], // empty means all are accepted
                    },
                  ],
                },
                // Not to be implemented yet, TBC. If not provided default to ALL_EVIDENCE.
                // "return_evidence_images": OFF | DOCUMENTS_ONLY | ALL_EVIDENCE
              },
            },
          ],
        },
      ],
    };
    policyBuilder.withAdvancedIdentityProfileRequirements(newMultipleIPRequirements);
  } else {
    policyBuilder.withFullName()
      .withEmail()
      .withPhoneNumber()
      .withSelfie()
      .withStructuredPostalAddress()
      .withAgeOver(18)
      .withNationality()
      .withGender()
      .withDocumentDetails()
      .withDocumentImages()
      .withWantedRememberMe();
  }

  const policy = policyBuilder.build();

  const subject = {
    subject_id: 'some_subject_id_string',
  };

  const shareSessionConfig = new ShareSessionConfigurationBuilder()
    .withRedirectUri('/profile')
    .withPolicy(policy)
    .withSubject(subject)
    .build();

  const createShareSessionResult = await sdkDigitalIdentityClient
    .createShareSession(shareSessionConfig);
  return res.send(createShareSessionResult.getId());
});

router.get('/get-receipt', async (req, res) => {
  const { query } = req;
  const { receiptId } = query;

  if (!receiptId) {
    return res.status(400).send('Missing "receiptId" in the query params!');
  }

  try {
    const receipt = await sdkDigitalIdentityClient.getShareReceipt(receiptId);

    const receiptError = receipt.getError();
    const timestamp = receipt.getTimestamp();
    const sessionId = receipt.getSessionId();
    const profile = receipt.getProfile();
    const hasIdentityProfile = Boolean(profile.getIdentityProfileReport());

    let receiptData = {
      sessionId,
      timestamp,
    };

    if (receiptError) {
      receiptData = {
        ...receiptData,
        error: receiptError,
      };
    } else if (hasIdentityProfile) {
      const { verification_report: verificationReport } = profile.getIdentityProfileReport().value;
      const {
        trust_framework: trustFramework,
        schemes_compliance: schemesCompliance,
      } = verificationReport;

      receiptData = {
        ...receiptData,
        hasIdentityProfile: true,
        trustFramework,
        schemesCount: schemesCompliance.length,
      };
    } else {
      receiptData = {
        ...receiptData,
        rememberMeId: receipt.getRememberMeId(),
        fullName: profile.getFullName().value,
        emailAddress: profile.getEmailAddress().value,
        phoneNumber: profile.getPhoneNumber().value,
        postalAddress: profile.getPostalAddress().value,
        nationality: profile.getNationality().value,
        gender: profile.getGender().value,
      };
    }

    return res.send(receiptData);
  } catch (e) {
    console.error('Error occurred when trying to fetch the receipt, see:\n', e);
    return res.status(500).send({
      message: e.message,
      ...(e.code && { code: e.code }),
      ...(e.reason && { reason: e.reason }),
    });
  }
});

module.exports = router;
