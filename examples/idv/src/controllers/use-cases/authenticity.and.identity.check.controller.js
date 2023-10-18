const {
  IDVClient,
  SessionSpecificationBuilder,
  SdkConfigBuilder,
  RequiredIdDocumentBuilder,
  RequestedDocumentAuthenticityCheckBuilder,
  RequestedThirdPartyIdentityCheckBuilder,
  RequestedTextExtractionTaskBuilder,
} = require('yoti');
const config = require('../../../config');

/**
 * Create an IDV session.
 */
async function createSession() {
  const idvClient = new IDVClient(
    config.YOTI_CLIENT_SDK_ID,
    config.YOTI_PEM
  );

  const sessionSpec = new SessionSpecificationBuilder()
    .withClientSessionTokenTtl(600)
    .withResourcesTtl(86400)
    .withUserTrackingId('some-user-tracking-id')
    .withRequestedCheck(
      new RequestedDocumentAuthenticityCheckBuilder()
        .withManualCheckFallback()
        .build()
    )
    .withRequestedCheck(
      new RequestedThirdPartyIdentityCheckBuilder()
        .build()
    )
    .withRequestedTask(
      new RequestedTextExtractionTaskBuilder()
        .withManualCheckFallback()
        .withChipDataDesired()
        .withCreateExpandedDocumentFields(true) // default is false
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
        .withSuccessUrl(`${config.YOTI_APP_BASE_URL}/success`)
        .withErrorUrl(`${config.YOTI_APP_BASE_URL}/error`)
        .withAllowHandoff(true)
        .withIdDocumentTextExtractionGenericRetries(3)
        .withIdDocumentTextExtractionReclassificationRetries(3)
        .build()
    )
    .withRequiredDocument(
      (new RequiredIdDocumentBuilder()).build()
    )
    .build();

  return idvClient.createSession(sessionSpec);
}

module.exports = async (req, res) => {
  try {
    const session = await createSession();

    req.session.IDV_SESSION_ID = session.getSessionId();
    req.session.IDV_SESSION_TOKEN = session.getClientSessionToken();

    res.render('pages/session', {
      sessionId: req.session.IDV_SESSION_ID,
      iframeUrl: `${config.YOTI_IDV_IFRAME_URL}?sessionID=${req.session.IDV_SESSION_ID}&sessionToken=${req.session.IDV_SESSION_TOKEN}`,
    });
  } catch (error) {
    res.render('pages/error', { error });
  }
};
