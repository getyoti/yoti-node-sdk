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
              // "return_evidence_images": OFF | DOCUMENTS_ONLY | ALL_EVIDENCE
              // Not to be implemented yet, TBC. If not provided default to ALL_EVIDENCE.
            },
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
