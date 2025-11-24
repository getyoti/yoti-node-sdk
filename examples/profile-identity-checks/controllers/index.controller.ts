import config = require('../config');

export default (req, res) => {
  res.render('pages/index', {
    yotiClientSdkId: config.CLIENT_SDK_ID,
  });
};
