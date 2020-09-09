const config = require('../../config');
const FileType = require('file-type');

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

    let contentType = media.getMimeType();
    let buffer = media.getContent().toBuffer();

    res.set('Content-Type', contentType);
    res.status(200).end(buffer);
  } catch (error) {
    res.render('pages/error', { error });
  }
};
