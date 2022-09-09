const {
  IDVClient,
  SessionSpecificationBuilder,
  SdkConfigBuilder,
} = require('yoti');
const config = require('../../config');

/**
 * Create an IDV session.
 */
async function createSession() {
  const idvClient = new IDVClient(
    config.YOTI_CLIENT_SDK_ID,
    config.YOTI_PEM
  );

  const subject = {
    subject_id: 'subject_id_string',
  };

  const identityProfileRequirements = {
    trust_framework: 'UK_TFIDA',
    scheme: {
      type: 'DBS',
      objective: 'BASIC',
    },
  };

  const sessionSpec = new SessionSpecificationBuilder()
    .withClientSessionTokenTtl(600)
    .withResourcesTtl(90000)
    .withUserTrackingId('some-user-tracking-id')
    .withSubject(subject)
    .withIdentityProfileRequirements(identityProfileRequirements)
    .withSdkConfig(
      new SdkConfigBuilder()
        .withPrimaryColour('#2d9fff')
        .withLocale('en-GB')
        .withPresetIssuingCountry('GBR')
        .withSuccessUrl(`${config.YOTI_APP_BASE_URL}/success`)
        .withErrorUrl(`${config.YOTI_APP_BASE_URL}/error`)
        .withAllowHandoff(true)
        .build()
    )
    .build();

  return idvClient.createSession(sessionSpec);
}

module.exports = async (req, res) => {
  try {
    const session = await createSession();

    req.session.IDV_SESSION_ID = session.getSessionId();
    req.session.IDV_SESSION_TOKEN = session.getClientSessionToken();

    res.render('pages/index', {
      iframeUrl: `${config.YOTI_IDV_IFRAME_URL}?sessionID=${req.session.IDV_SESSION_ID}&sessionToken=${req.session.IDV_SESSION_TOKEN}`,
    });
  } catch (error) {
    res.render('pages/error', { error });
  }
};
