const Yoti = require('yoti');
const config = require('../config');

const yotiClient = new Yoti.Client(config.CLIENT_SDK_ID, config.PEM_KEY);

module.exports = (req, res) => {
  const dynamicPolicy = new Yoti.DynamicPolicyBuilder()
    .withFullName()
    .build();

  const dynamicScenario = new Yoti.DynamicScenarioBuilder()
    .withCallbackEndpoint('/profile')
    .withPolicy(dynamicPolicy)
    .build();

  yotiClient.createShareSession(dynamicScenario)
    .then((shareSessionResult) => yotiClient.createShareQrCode(shareSessionResult.getId())
      .then((shareQrCodeResult) => {
        res.status(200).json({ session: shareSessionResult, qrCode: shareQrCodeResult });
      })).catch((error) => {
      console.error(error.message);
      res.status(400).json(error);
    });
};
