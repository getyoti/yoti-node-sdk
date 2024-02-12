const Yoti = require('yoti');
const config = require('../config');

const yotiClient = new Yoti.Client(config.CLIENT_SDK_ID, config.PEM_KEY);

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
  MTF_BASE: {
    profiles: [
      {
        trust_framework: 'UK_TFIDA',
        schemes: [
          {
            type: 'DBS',
            objective: 'STANDARD',
            label: 'dbs-standard',
          },
          {
            type: 'RTW',
            objective: '',
            label: 'rtw',
          },
        ],
      },
      {
        trust_framework: 'YOTI_GLOBAL',
        schemes: [
          {
            type: 'IDENTITY',
            objective: 'AL_L1',
            label: 'identity-AL-L1',
          },
          {
            type: 'IDENTITY',
            objective: 'AL_M1',
            label: 'identity-AL-M1',
          },
        ],
      },
    ],
  },
};

module.exports = async (req, res) => {
  const { scheme } = req.query;
  const dynamicPolicyBuilder = new Yoti.DynamicPolicyBuilder();

  if (scheme === 'MTF_BASE') {
    const identityProfileRequirementsDescriptor = identityProfileRequirementsDescriptors.MTF_BASE;
    dynamicPolicyBuilder
      .withAdvancedIdentityProfileRequirements(identityProfileRequirementsDescriptor);
  } else {
    dynamicPolicyBuilder
      .withIdentityProfileRequirements(identityProfileRequirementsDescriptors[scheme]);
  }

  const dynamicPolicy = dynamicPolicyBuilder.build();

  const subject = {
    subject_id: 'subject_id_string',
  };

  const dynamicScenario = new Yoti.DynamicScenarioBuilder()
    .withCallbackEndpoint('/identity-profile-report')
    .withPolicy(dynamicPolicy)
    .withSubject(subject)
    .build();

  const shareUrlResult = await yotiClient.createShareUrl(dynamicScenario);
  const shareUrl = shareUrlResult.getShareUrl();

  res.json({ shareUrl });
};
