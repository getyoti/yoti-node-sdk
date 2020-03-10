const config = require('../../config');

const {
  DocScanClient,
} = require('yoti');

module.exports = async (req, res) => {
  const docScanClient = new DocScanClient(
    config.YOTI_CLIENT_SDK_ID,
    config.YOTI_PEM
  );

  try {
    const sessionResult = await docScanClient.getSession(req.session.DOC_SCAN_SESSION_ID);
    res.render('pages/success', { sessionResult });
  } catch (error) {
    res.render('pages/error', { error });
  }
};
