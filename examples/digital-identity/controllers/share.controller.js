const { Router } = require('express');
const {
  DigitalIdentityBuilders: {
    PolicyBuilder,
    ShareSessionConfigurationBuilder,
  },
} = require('yoti');

const config = require('../config');
const sdkDigitalIdentityClient = require('./sdk.digital.identity.client');

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
  if (policyType === 'MTF_BASE') {
    const identityProfileRequirementsDescriptor = identityProfileRequirementsDescriptors.MTF_BASE;
    policyBuilder
      .withAdvancedIdentityProfileRequirements(identityProfileRequirementsDescriptor);
  } else if (Object.keys(identityProfileRequirementsDescriptors).includes(policyType)) {
    policyBuilder
      .withIdentityProfileRequirements(identityProfileRequirementsDescriptors[policyType]);
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
