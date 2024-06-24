const {
  IDVClient,
  SessionSpecificationBuilder,
  SdkConfigBuilder,
  AdvancedIdentityProfileBuilder,
  AdvancedIdentityProfileRequirementsBuilder,
  AdvancedIdentityProfileSchemeBuilder,
} = require('yoti');
const config = require('../../config');

const identityProfileRequirementsDescriptors = {
  RTW: {
    trust_framework: 'UK_TFIDA',
    scheme: {
      type: 'RTW',
    },
  },
  RTR: {
    trust_framework: 'UK_TFIDA',
    scheme: {
      type: 'RTR',
    },
  },
  DBS_BASIC: {
    trust_framework: 'UK_TFIDA',
    scheme: {
      type: 'DBS',
      objective: 'BASIC',
    },
  },
  DBS_BASIC_RTW: {
    trust_framework: 'UK_TFIDA',
    scheme: {
      type: 'DBS_RTW',
      objective: 'BASIC',
    },
  },
};

/**
 * Create an IDV session.
 */
async function createSession(scheme) {
  const idvClient = new IDVClient(config.YOTI_CLIENT_SDK_ID, config.YOTI_PEM);

  const sessionSpecificationBuilder = new SessionSpecificationBuilder();

  const subject = {
    subject_id: 'some_subject_id_string',
  };

  if (scheme === 'MTF_BASE') {
    const advancedIdentityProfileSchemeDBS = new AdvancedIdentityProfileSchemeBuilder()
      .withType('DBS')
      .withObjective('BASIC')
      .withLabel('label-for-DBS-BASIC')
      .build();

    const advancedIdentityProfileSchemeRTW = new AdvancedIdentityProfileSchemeBuilder()
      .withType('RTW')
      .withLabel('label-for-RTW')
      .build();

    const advancedIdentityProfileUKTFIDA = new AdvancedIdentityProfileBuilder()
      .withTrustFramework('UK_TFIDA')
      .withScheme(advancedIdentityProfileSchemeDBS)
      .withScheme(advancedIdentityProfileSchemeRTW)
      .build();

    const advancedIdentityProfileSchemeAL1 = new AdvancedIdentityProfileSchemeBuilder()
      .withType('IDENTITY')
      .withObjective('AL_L1')
      .withLabel('label-for-IDENTITY-AL-L1')
      .build();

    const advancedIdentityProfileYotiGlobal = new AdvancedIdentityProfileBuilder()
      .withTrustFramework('YOTI_GLOBAL')
      .withScheme(advancedIdentityProfileSchemeAL1)
      .build();

    const advancedIdentityProfileRequirements = new AdvancedIdentityProfileRequirementsBuilder()
      .withProfile(advancedIdentityProfileUKTFIDA)
      .withProfile(advancedIdentityProfileYotiGlobal)
      .build();

    sessionSpecificationBuilder
      .withAdvancedIdentityProfileRequirements(advancedIdentityProfileRequirements);
  } else {
    const identityProfileRequirements = identityProfileRequirementsDescriptors[scheme];
    sessionSpecificationBuilder
      .withIdentityProfileRequirements(identityProfileRequirements);
  }

  const sessionSpec = sessionSpecificationBuilder
    .withClientSessionTokenTtl(600) // 10 minutes
    .withResourcesTtl(90000) // session TTL(10 minutes) + 24 hours(minimum required)
    .withUserTrackingId('some-user-tracking-id')
    .withSubject(subject)
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
  const { scheme } = req.body;
  try {
    const session = await createSession(scheme);

    req.session.IDV_SESSION_ID = session.getSessionId();
    req.session.IDV_SESSION_TOKEN = session.getClientSessionToken();
    res.render('pages/session', {
      iframeUrl: `${config.YOTI_IDV_IFRAME_URL}?sessionID=${req.session.IDV_SESSION_ID}&sessionToken=${req.session.IDV_SESSION_TOKEN}`,
    });
  } catch (error) {
    res.render('pages/error', { error });
  }
};
