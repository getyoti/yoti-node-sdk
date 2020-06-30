const config = require('../config');

module.exports = (req, res) => {
  res.render('pages/index', {
    yotiClientSdkId: config.CLIENT_SDK_ID,
    yotiScenarioId: config.SCENARIO_ID,
  });
};
