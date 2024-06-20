const {
  IDVClient,
  SessionSpecificationBuilder,
  SdkConfigBuilder,
  AdvancedIdentityProfileBuilder,
  AdvancedIdentityProfileRequirementsBuilder,
  AdvancedIdentityProfileSchemeBuilder,
} = require('yoti');
const config = require('../../config');

/**
 * Create an IDV session.
 */
async function createSession() {
  const idvClient = new IDVClient(config.YOTI_CLIENT_SDK_ID, config.YOTI_PEM);

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

  const advancedIdentityProfileSchemeDBS = new AdvancedIdentityProfileSchemeBuilder()
    .withType('DBS')
    .withObjective('BASIC')
    .withLabel('lalala-DBS')
    .build();

  const advancedIdentityProfileSchemeRTW = new AdvancedIdentityProfileSchemeBuilder()
    .withType('RTW')
    .withLabel('lalala-RTW')
    .build();

  const advancedIdentityProfileUKTFIDA = new AdvancedIdentityProfileBuilder()
    .withTrustFramework('UK_TFIDA')
    .withScheme(advancedIdentityProfileSchemeDBS)
    .withScheme(advancedIdentityProfileSchemeRTW)
    .build();

  const advancedIdentityProfileSchemeYGI = new AdvancedIdentityProfileSchemeBuilder()
    .withType('IDENTITY')
    .withObjective('AL_L1')
    .withLabel('my-idendity-AL-L1')
    .build();

  const advancedIdentityProfileYotiGlobal = new AdvancedIdentityProfileBuilder()
    .withTrustFramework('YOTI_GLOBAL')
    .withScheme(advancedIdentityProfileSchemeYGI)
    .withScheme(advancedIdentityProfileSchemeRTW)
    .build();

  const advancedIdentityProfileRequirements = new AdvancedIdentityProfileRequirementsBuilder()
    .withProfile(advancedIdentityProfileUKTFIDA)
    .withProfile(advancedIdentityProfileYotiGlobal)
    .build();

  const sessionSpec = new SessionSpecificationBuilder()
    .withClientSessionTokenTtl(600) // 10 minutes
    .withResourcesTtl(90000) // session TTL(10 minutes) + 24 hours(minimum required)
    .withUserTrackingId('some-user-tracking-id')
    .withSubject(subject)
    // .withIdentityProfileRequirements(identityProfileRequirements)
    .withAdvancedIdentityProfileRequirements(advancedIdentityProfileRequirements)
    .withSdkConfig(
      new SdkConfigBuilder()
        .withPrimaryColour('#2d9fff')
        .withLocale('en-GB')
        .withPresetIssuingCountry('GBR')
        .withSuccessUrl(`${config.YOTI_APP_BASE_URL}/success`)
        .withErrorUrl(`${config.YOTI_APP_BASE_URL}/error`)
        .withAllowHandoff(true)
        .withAllowsCameraAndUpload()
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
