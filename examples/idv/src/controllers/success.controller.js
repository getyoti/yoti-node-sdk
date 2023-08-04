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
    const sessionResult = await idvClient.getSession(sessionId);

    res.render('pages/success', { sessionResult });
  } catch (error) {
    res.render('pages/error', { error });
  }
};
