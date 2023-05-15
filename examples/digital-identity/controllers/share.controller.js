const { Router } = require('express');
const {
  DigitalIdentityBuilders: {
    PolicyBuilder,
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

router.get('/createSession', (req, res) => {
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

  res.render('pages/share', {
    yotiClientSdkId: config.CLIENT_SDK_ID,
    client: digitalIdentityClient,
    shareSessionConfig,
  });
});

module.exports = router;
