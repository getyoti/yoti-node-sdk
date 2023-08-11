const {
  IDVClient,
  SessionSpecificationBuilder,
  SdkConfigBuilder,
  RequiredIdDocumentBuilder,
  OrthogonalRestrictionsFilterBuilder,
  RequestedTextExtractionTaskBuilder,
  DocumentRestrictionsFilterBuilder,
  DocumentRestrictionBuilder,
} = require('yoti');
const config = require('../../../config');

/**
 * Create an IDV session.
 *
 * Show how to allow expired documents with any of the 2 filters:
 * - OrthogonalRestrictionsFilterBuilder
 * - DocumentRestrictionsFilterBuilder
 *
 * Note: comment out one of the required document filter example below
 */
async function createSession() {
  const idvClient = new IDVClient(
    config.YOTI_CLIENT_SDK_ID,
    config.YOTI_PEM
  );

  const sessionSpec = new SessionSpecificationBuilder()
    .withClientSessionTokenTtl(600)
    .withResourcesTtl(90000)
    .withUserTrackingId('some-user-tracking-id')
    .withRequestedTask(
      new RequestedTextExtractionTaskBuilder()
        .withManualCheckAlways()
        .build()
    )
    // With OrthogonalRestrictionsFilterBuilder
    .withRequiredDocument(
      (new RequiredIdDocumentBuilder())
        .withFilter(
          (new OrthogonalRestrictionsFilterBuilder())
            .withWhitelistedDocumentTypes(['PASSPORT'])
            .withAllowExpiredDocuments(true)
            .build()
        )
        .build()
    )
    // With DocumentRestrictionsFilterBuilder
    .withRequiredDocument(
      (new RequiredIdDocumentBuilder())
        .withFilter(
          (new DocumentRestrictionsFilterBuilder())
            .withDocumentRestriction((new DocumentRestrictionBuilder())
              .withDocumentTypes(['PASSPORT'])
              .build())
            .forWhitelist()
            .withAllowExpiredDocuments(true)
            .build()
        )
        .build()
    )
    .withSdkConfig(
      new SdkConfigBuilder()
        .withAllowsCameraAndUpload()
        .withLocale('en-GB')
        .withPresetIssuingCountry('GBR')
        .withSuccessUrl(`${config.YOTI_APP_BASE_URL}/success`)
        .withErrorUrl(`${config.YOTI_APP_BASE_URL}/error`)
        .withIdDocumentTextExtractionGenericRetries(5)
        .withIdDocumentTextExtractionReclassificationRetries(5)
        .build()
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
