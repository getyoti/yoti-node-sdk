const config = require('../config');

const {
  DocScanClient,
  SessionSpecificationBuilder,
  RequestedDocumentAuthenticityCheckBuilder,
  RequestedLivenessCheckBuilder,
  RequestedTextExtractionTaskBuilder,
  SdkConfigBuilder,
} = require('yoti');

const fs = require('fs');

module.exports = async (req, res) => {
  const docScanClient = new DocScanClient(
    process.env.YOTI_CLIENT_SDK_ID,
    fs.readFileSync(process.env.YOTI_KEY_FILE_PATH),
  );

  const sessionSpec = new SessionSpecificationBuilder()
    .withClientSessionTokenTtl(600)
    .withResourcesTtl(90000)
    .withUserTrackingId('some-user-tracking-id')
    .withRequestedCheck(
      new RequestedDocumentAuthenticityCheckBuilder()
        .build()
    )
    .withRequestedCheck(
      new RequestedLivenessCheckBuilder()
        .forZoomLiveness()
        .build()
    )
    .withRequestedTask(
      new RequestedTextExtractionTaskBuilder()
        .withManualCheckNever()
        .build()
    )
    .withSdkConfig(
      new SdkConfigBuilder()
        .withAllowsCameraAndUpload()
        .withPrimaryColour('#2d9fff')
        .withSecondaryColour('#FFFFFF')
        .withFontColour('#FFFFFF')
        .withLocale('en-GB')
        .withPresetIssuingCountry('GBR')
        .withSuccessUrl('/success')
        .withErrorUrl('/error')
        .build()
    )
    .build();

  const session = await docScanClient.createSession(sessionSpec);

  res.render('pages/index', {
    iframeUrl: `${process.env.YOTI_DOC_SCAN_IFRAME_URL}?sessionID=${session.getSessionId()}&sessionToken=${session.getClientSessionToken()}`,
  });
};
