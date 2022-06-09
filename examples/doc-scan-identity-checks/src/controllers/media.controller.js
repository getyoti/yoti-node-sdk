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
    const media = await docScanClient.getMediaContent(
      req.session.DOC_SCAN_SESSION_ID,
      req.query.mediaId
    );

    const { buffer } = media.getContent();

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
