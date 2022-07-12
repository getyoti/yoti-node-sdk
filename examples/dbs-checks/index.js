/* eslint-disable camelcase */
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const Yoti = require('yoti');

const config = require('./config');

const app = express();
const port = process.env.PORT || 9443;

const yotiClient = new Yoti.Client(config.CLIENT_SDK_ID, config.PEM);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/static', express.static('static'));

const router = express.Router();

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
  DBS_STANDARD: {
    trust_framework: 'UK_TFIDA',
    scheme: {
      type: 'DBS',
      objective: 'STANDARD',
    },
  },
  DBS_ENHANCED: {
    trust_framework: 'UK_TFIDA',
    scheme: {
      type: 'DBS',
      objective: 'ENHANCED',
    },
  },
  DBS_RTW_BASIC: {
    trust_framework: 'UK_TFIDA',
    scheme: {
      type: 'DBS_RTW',
      objective: 'BASIC',
    },
  },
  DBS_RTW_STANDARD: {
    trust_framework: 'UK_TFIDA',
    scheme: {
      type: 'DBS_RTW',
      objective: 'STANDARD',
    },
  },
  DBS_RTW_ENHANCED: {
    trust_framework: 'UK_TFIDA',
    scheme: {
      type: 'DBS_RTW',
      objective: 'ENHANCED',
    },
  },
};

router.get('/', (req, res) => {
  res.render('pages/dbs-checks', {
    shareClient: config.SHARE_CLIENT,
    yotiClientSdkId: config.CLIENT_SDK_ID,
  });
});

router.get('/get-new-share-url', async (req, res) => {
  const { scheme, attributes: attributesString, subjectId } = req.query;

  const attributes = attributesString.split(',');

  const identityProfileRequirementsDescriptor = identityProfileRequirementsDescriptors[scheme];

  let dynamicPolicy = new Yoti.DynamicPolicyBuilder()
    .withIdentityProfileRequirements(identityProfileRequirementsDescriptor);

  if (attributes[0] !== '') {
    attributes.forEach((attribute) => {
      switch (attribute) {
        case 'selfie':
          dynamicPolicy.withSelfie();
          break;
        case 'phoneNumber':
          dynamicPolicy.withPhoneNumber();
          break;
        case 'email':
          dynamicPolicy.withEmail();
          break;
        case 'covid19VirusTest':
          dynamicPolicy.withWantedAttributeByName('com.yoti.virus.covid19.test');
          break;
        case 'rememberMeId':
          dynamicPolicy.withWantedRememberMe(true);
          break;
        default:
          break;
      }
    });
  }

  dynamicPolicy = dynamicPolicy.build();

  let dynamicScenario = new Yoti.DynamicScenarioBuilder()
    .withCallbackEndpoint('/profile')
    .withPolicy(dynamicPolicy);

  if (subjectId) {
    dynamicScenario.withSubject({
      subject_id: subjectId,
    });
  }

  dynamicScenario = dynamicScenario.build();

  console.log('######## DBS check scenario', JSON.stringify(dynamicScenario, null, 8), '########');

  const shareUrlResult = await yotiClient.createShareUrl(dynamicScenario);
  const shareUrl = shareUrlResult.getShareUrl();

  console.log(`The share URL is = ${shareUrl}\n`);
  res.json({ shareUrl });
});

router.get('/profile', (req, res) => {
  const { token } = req.query;
  if (!token) {
    res.render('pages/error', {
      error: 'No token has been provided.',
    });
    return;
  }

  let profile = null;
  let identityAssertion = null;
  let verificationReport = null;
  let proofValue = null;
  let authenticationReport = null;
  let documentImagesAttributes = [];
  let selfie = null;
  let rememberMeId = null;
  let errorDetails = null;

  const promise = yotiClient.getActivityDetails(token);
  promise.then((activityDetails) => {
    const outcome = activityDetails.getOutcome();
    console.log('######## Identity profile check outcome =', outcome, '########');
    if (outcome === 'SUCCESS') {
      profile = activityDetails.getProfile();

      if (profile
          && profile.getIdentityProfileReport()
          && profile.getIdentityProfileReport().getValue()) {
        const identityProfile = profile.getIdentityProfileReport().getValue();
        console.log('######## Identity profile report ', JSON.stringify(identityProfile, null, 2), '########');

        const {
          identity_assertion,
          verification_report,
          proof,
          authentication_report,
        } = identityProfile;

        identityAssertion = identity_assertion;
        verificationReport = verification_report;
        proofValue = proof;
        authenticationReport = authentication_report;

        const { evidence } = verificationReport;
        const { documents, face } = evidence;
        const { selfie_attribute_id } = face;
        documentImagesAttributes = documents
          // eslint-disable-next-line camelcase
          .map(({ document_images_attribute_id }) => (document_images_attribute_id
            ? (profile && profile.getAttributeById(document_images_attribute_id)) : null))
          .filter((documentImagesAttribute) => documentImagesAttribute);

        selfie = selfie_attribute_id
          ? (profile && profile.getAttributeById(selfie_attribute_id))
          : null;

        rememberMeId = activityDetails.getRememberMeId();
        // eslint-disable-next-line max-len
        // documentImagesAttributes.map((documentImagesAttribute) => documentImagesAttribute.getValue());
      }
    } else {
      errorDetails = activityDetails.getErrorDetails();
      console.log('######## Error: ', JSON.stringify(errorDetails, null, 2), '########');
    }

    res.render('pages/identity-profile', {
      outcome,
      identityAssertion,
      verificationReport,
      proofValue,
      authenticationReport,
      profile,
      documentImagesAttributes,
      selfie,
      rememberMeId,
      errorDetails,
    });
  }).catch((err) => {
    console.error(err);
    res.render('pages/error', {
      error: err,
    });
  });
});

app.use('/', router);

// START THE SERVER
// =============================================================================
https.createServer({
  key: fs.readFileSync(path.join(__dirname, '../keys', 'server-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, '../keys', 'server-cert.pem')),
}, app).listen(port);

console.log(`Server running on https://localhost:${port}\n`);

console.log(`The test environment is: ${config.ENVIRONMENT}`);

console.log('\n------------------------------------------\n');
