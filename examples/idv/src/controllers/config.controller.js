const {
  IDVClient,
} = require('yoti');
const config = require('../../config');

module.exports = async (req, res) => {
  const sessionIdFromQuery = req.query && req.query.sessionID;
  const sessionId = sessionIdFromQuery || req.session.IDV_SESSION_ID;
  const idvClient = new IDVClient(
    config.YOTI_CLIENT_SDK_ID,
    config.YOTI_PEM
  );

  try {
    const sessionConfig = await idvClient.getSessionConfiguration(sessionId);
    res.render('pages/config', { sessionConfig });
  } catch (error) {
    res.render('pages/error', { error });
  }
};
