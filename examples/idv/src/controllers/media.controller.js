const {
  IDVClient,
} = require('yoti');
const config = require('../../config');

module.exports = async (req, res) => {
  const idvClient = new IDVClient(
    config.YOTI_CLIENT_SDK_ID,
    config.YOTI_PEM
  );

  try {
    const media = await idvClient.getMediaContent(
      req.session.IDV_SESSION_ID,
      req.query.mediaId
    );

    const buffer = media.getContent();

    if (buffer.length === 0) {
      res.status(204).end(buffer);
    } else {
      res.set('Content-Type', media.getMimeType());
      res.status(200).end(buffer);
    }
  } catch (error) {
    res.render('pages/error', { error });
  }
};
