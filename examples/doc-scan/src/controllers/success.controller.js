const config = require('../../config');

const {
  DocScanClient,
} = require('yoti');

module.exports = async (req, res) => {
  const sessionIdFromQuery = req.query && req.query.sessionID;
  const sessionId = sessionIdFromQuery || req.session.DOC_SCAN_SESSION_ID;
  const docScanClient = new DocScanClient(
    config.YOTI_CLIENT_SDK_ID,
    config.YOTI_PEM
  );

  try {
    const sessionResult = await docScanClient.getSession(sessionId);
    res.render('pages/success', { sessionResult });
  } catch (error) {
    res.render('pages/error', { error });
  }
};
