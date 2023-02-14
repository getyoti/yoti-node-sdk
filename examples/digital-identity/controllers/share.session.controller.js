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

module.exports = (req, res) => {
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
      res.json({ ShareSessionResult: shareSessionCreateResult });
    })
    .catch((error) => {
      console.error({ status: error.status, message: error.response.text });
      res.end();
    });
};
