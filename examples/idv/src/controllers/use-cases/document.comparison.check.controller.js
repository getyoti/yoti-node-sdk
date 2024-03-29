const {
  IDVClient,
  SessionSpecificationBuilder,
  SdkConfigBuilder,
  RequiredIdDocumentBuilder,
  OrthogonalRestrictionsFilterBuilder,
  RequiredSupplementaryDocumentBuilder,
  ProofOfAddressObjectiveBuilder,
  RequestedIdDocumentComparisonCheckBuilder,
  RequestedTextExtractionTaskBuilder,
  RequestedSupplementaryDocTextExtractionTaskBuilder,
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
    .withClientSessionTokenTtl(600) // 10 minutes
    .withResourcesTtl(90000) // session TTL(10 minutes) + 24 hours(minimum required)
    .withUserTrackingId('some-user-tracking-id')
    .withRequestedCheck(
      new RequestedIdDocumentComparisonCheckBuilder()
        .build()
    )
    .withRequestedTask(
      new RequestedTextExtractionTaskBuilder()
        .withManualCheckFallback()
        .withChipDataDesired()
        .withCreateExpandedDocumentFields(true) // default is false
        .build()
    )
    .withRequestedTask(
      new RequestedSupplementaryDocTextExtractionTaskBuilder()
        .withManualCheckFallback()
        .build()
    )
    .withRequiredDocument(
      (new RequiredIdDocumentBuilder())
        .withFilter(
          (new OrthogonalRestrictionsFilterBuilder())
            .withWhitelistedDocumentTypes(['PASSPORT'])
            .build()
        )
        .build()
    )
    .withRequiredDocument(
      (new RequiredIdDocumentBuilder()).build()
    )
    .withRequiredDocument(
      (new RequiredSupplementaryDocumentBuilder())
        .withObjective(
          (new ProofOfAddressObjectiveBuilder()).build()
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
