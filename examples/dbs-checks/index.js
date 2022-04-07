require('dotenv').config();
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const Yoti = require('yoti');

const app = express();
const port = process.env.PORT || 9443;

// The scenario ID and .pem file are generated by https://hub.yoti.com when you create your app
// The client SDK ID is generated by https://hub.yoti.com when you publish your app
const config = {
  SCENARIO_ID: process.env.YOTI_SCENARIO_ID, // Your Yoti Scenario ID
  CLIENT_SDK_ID: process.env.YOTI_CLIENT_SDK_ID, // Your Yoti Client SDK ID
  PEM_KEY: fs.readFileSync(path.join(__dirname, process.env.YOTI_KEY_FILE_PATH)),
};

const yotiClient = new Yoti.Client(config.CLIENT_SDK_ID, config.PEM_KEY);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/static', express.static('static'));

const router = express.Router();

router.get('/', (req, res) => {
  res.render('pages/dbs-checks', {
    yotiClientSdkId: config.CLIENT_SDK_ID,
  });
});

router.get('/get-new-share-url', async (req, res) => {
  const identityProfileRequirementsDescriptor = {
    trust_framework: 'UK_TFIDA',
    scheme: {
      type: 'DBS',
      objective: 'BASIC',
    },
  };

  const subject = {
    subject_id: 'subject_id_string',
  };

  const dynamicPolicy = new Yoti.DynamicPolicyBuilder()
    .withIdentityProfileRequirements(identityProfileRequirementsDescriptor)
    .build();

  const dynamicScenario = new Yoti.DynamicScenarioBuilder()
    .withCallbackEndpoint('/profile')
    .withPolicy(dynamicPolicy)
    .withSubject(subject)
    .build();

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

  const promise = yotiClient.getActivityDetails(token);
  promise.then((activityDetails) => {
    const profile = activityDetails.getProfile();

    if (profile
            && profile.getIdentityProfileReport()
            && profile.getIdentityProfileReport().getValue()) {
      const identityProfile = JSON.stringify(profile.getIdentityProfileReport().getValue());
      console.log('######## Identity profile report ', identityProfile, '########');

      res.render('pages/identity-profile', {
        identityProfile: identityProfile || '',
      });
    }
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

console.log(`Server running on https://localhost:${port}`);
