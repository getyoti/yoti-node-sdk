const { Router } = require('express');
const {
  DigitalIdentityBuilders: {
    PolicyBuilder,
    LocationConstraintExtensionBuilder,
    ShareSessionConfigurationBuilder,
  },
  DigitalIdentityClient,
} = require('yoti');

const config = require('../config');

const digitalIdentityClient = new DigitalIdentityClient(
  config.CLIENT_SDK_ID,
  config.PEM_KEY,
);

const router = Router();

const jsonToFormattedString = (json) => JSON.stringify(json, undefined, 2);

router.get('/createSession', (req, res) => {
  const locationExtension = new LocationConstraintExtensionBuilder()
    .withLatitude(51.5074)
    .withLongitude(-0.1278)
    .withRadius(6000)
    .build();

  const policy = new PolicyBuilder()
    .withFullName()
    .withEmail()
    .withPhoneNumber()
    .withSelfie()
    .withStructuredPostalAddress()
    .withAgeOver(18)
    .withNationality()
    .withGender()
    .withDocumentDetails()
    .withDocumentImages()
    .withWantedRememberMe()
    .build();

  const subject = {
    subject_id: 'some_subject_id_string',
  };

  const shareSessionConfig = new ShareSessionConfigurationBuilder()
    .withRedirectUri('/profile')
    .withPolicy(policy)
    .withExtension(locationExtension)
    .withSubject(subject)
    .build();

  digitalIdentityClient
    .createShareSession(shareSessionConfig)
    .then((shareSessionCreateResult) => {
      res.end(jsonToFormattedString({ ShareSessionResult: shareSessionCreateResult }));
    })
    .catch((error) => {
      const {
        status, code, reason, message,
      } = error;
      const errorData = {
        status, code, reason, message,
      };
      console.error(errorData);
      res.end(jsonToFormattedString(errorData));
    });
});

router.get('/fetchSession/:sessionId', (req, res) => {
  const { sessionId } = req.params;

  digitalIdentityClient.fetchShareSession(sessionId).then((shareSessionFetchResult) => {
    res.end(jsonToFormattedString(shareSessionFetchResult));
  });
});

router.post('/fetchReceipt', (req, res) => {
  const { receiptId } = req.body;

  digitalIdentityClient.fetchReceipt(receiptId).then((receipt) => {
    res.end(jsonToFormattedString(receipt));
  });
});

module.exports = router;
