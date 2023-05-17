const { Router } = require('express');
const {
  DigitalIdentityBuilders: {
    PolicyBuilder,
    ShareSessionConfigurationBuilder,
  },
} = require('yoti');

const config = require('../config');
const sdkDigitalIdentityClient = require('./sdk.digital.identity.client');

const router = Router();

router.get('/', (req, res) => {
  res.render('pages/share', {
    yotiClientSdkId: config.CLIENT_SDK_ID,
  });
});

router.get('/get-new-session-id', async (req, res) => {
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
    res.status(400).send('Missing "receiptId" in the query params!');
  }

  const receipt = await sdkDigitalIdentityClient.getShareReceipt(receiptId);

  const profile = receipt.getProfile();

  const receiptData = {
    rememberMeId: receipt.getRememberMeId(),
    fullName: profile.getFullName().value,
    emailAddress: profile.getEmailAddress().value,
    phoneNumber: profile.getPhoneNumber().value,
    postalAddress: profile.getPostalAddress().value,
    nationality: profile.getNationality().value,
    gender: profile.getGender().value,
  };

  return res.send(receiptData);
});

module.exports = router;
