const config = require('../config');

const {
  DocScanClient,
} = require('yoti');

module.exports = async (req, res) => {
  const docScanClient = new DocScanClient(
    config.YOTI_CLIENT_SDK_ID,
    config.YOTI_PEM,
  );

  try {
    const media = await docScanClient.getMediaContent(req.session.DOC_SCAN_SESSION_ID, req.query.mediaId);
    res.set('Content-Type', media.getMimeType());
    res.status(200).end(media.getContent().buffer);
  } catch(error) {
    res.render('pages/error', { error });
  }
};
