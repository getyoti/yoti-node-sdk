const {
  IDVClient,
  SessionSpecificationBuilder,
  SdkConfigBuilder,
  RequiredIdDocumentBuilder,
  RequestedDocumentAuthenticityCheckBuilder,
  RequestedTextExtractionTaskBuilder,
  AllowedProviderBuilder,
  DocumentRestrictionsFilterBuilder,
  DocumentRestrictionBuilder,
  OrthogonalRestrictionsFilterBuilder,
} = require('yoti');
const config = require('../../../config');

const documentRestrictionsFilter = new DocumentRestrictionsFilterBuilder()
  .withDocumentRestriction((new DocumentRestrictionBuilder())
    .withDocumentTypes(['DIGITAL_AADHAAR'])
    .build())
  .forWhitelist()
  .withAllowDigitalIds(true)
  .withAllowedProviders([
    new AllowedProviderBuilder().withName('DIGILOCKER').build(),
  ])
  .build();

// NOTE: can be used instead of documentRestrictionsFilter
// eslint-disable-next-line no-unused-vars
const orthogonalRestrictionsFilter = new OrthogonalRestrictionsFilterBuilder()
  .withAllowDigitalIds(true)
  .withAllowedProviders([
    new AllowedProviderBuilder().withName('DIGILOCKER').build(),
  ])
  .build();

/**
 * Create an IDV session.
 */
async function createSession() {
  const idvClient = new IDVClient(
    config.YOTI_CLIENT_SDK_ID,
    config.YOTI_PEM
  );

  const sessionSpec = new SessionSpecificationBuilder()
    .withClientSessionTokenTtl(600) // 10 minutes
    .withResourcesTtl(90000) // session TTL(10 minutes) + 24 hours(minimum required)
    .withUserTrackingId('some-user-tracking-id')
    .withRequestedCheck(
      new RequestedDocumentAuthenticityCheckBuilder()
        .withManualCheckFallback()
        .build()
    )
    .withRequestedTask(
      new RequestedTextExtractionTaskBuilder()
        .withManualCheckFallback()
        .build()
    )
    .withRequiredDocument(
      (new RequiredIdDocumentBuilder())
        .withFilter(documentRestrictionsFilter)
        // .withFilter(orthogonalRestrictionsFilter)
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
