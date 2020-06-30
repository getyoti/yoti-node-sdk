const config = require('../config');
const Yoti = require('yoti');

const yotiClient = new Yoti.Client(config.CLIENT_SDK_ID, config.PEM_KEY);

module.exports = (req, res) => {
  const locationExtension = new Yoti.LocationConstraintExtensionBuilder()
    .withLatitude(51.5074)
    .withLongitude(-0.1278)
    .withRadius(6000)
    .build();

  const dynamicPolicy = new Yoti.DynamicPolicyBuilder()
    .withFullName()
    .withSelfie()
    .withPhoneNumber()
    .withAgeOver(18)
    .withDocumentDetails()
    .withDocumentImages()
    .build();

  const dynamicScenario = new Yoti.DynamicScenarioBuilder()
    .withCallbackEndpoint('/profile')
    .withPolicy(dynamicPolicy)
    .withExtension(locationExtension)
    .build();

  yotiClient.createShareUrl(dynamicScenario)
    .then((shareUrlResult) => {
      res.render('pages/dynamic-share', {
        yotiClientSdkId: config.CLIENT_SDK_ID,
        yotiShareUrl: shareUrlResult.getShareUrl(),
      });
    }).catch((error) => {
      console.error(error.message);
    });
};
