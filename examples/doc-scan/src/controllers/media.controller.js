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

    // If the media is base64 encoded, decode and detect the mime type.
    if (req.query.base64 === '1' && contentType === 'application/octet-stream') {
      buffer = Buffer.from(buffer.toString('utf8'), 'base64');
      const fileInfo = await FileType.fromBuffer(buffer);
      contentType = fileInfo.mime || contentType;
    }

    res.set('Content-Type', contentType);
    res.status(200).end(buffer);
  } catch (error) {
    res.render('pages/error', { error });
  }
};
