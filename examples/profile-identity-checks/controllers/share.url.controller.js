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
};

module.exports = async (req, res) => {
  const { scheme } = req.query;

  const identityProfileRequirementsDescriptor = identityProfileRequirementsDescriptors[scheme];

  const subject = {
    subject_id: 'subject_id_string',
  };

  const dynamicPolicy = new Yoti.DynamicPolicyBuilder()
    .withIdentityProfileRequirements(identityProfileRequirementsDescriptor)
    .build();

  const dynamicScenario = new Yoti.DynamicScenarioBuilder()
    .withCallbackEndpoint('/identity-profile-report')
    .withPolicy(dynamicPolicy)
    .withSubject(subject)
    .build();

  const shareUrlResult = await yotiClient.createShareUrl(dynamicScenario);
  const shareUrl = shareUrlResult.getShareUrl();

  res.json({ shareUrl });
};
