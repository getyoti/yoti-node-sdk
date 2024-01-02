const {
  IDVClient,
  SessionSpecificationBuilder,
  SdkConfigBuilder,
  RequiredIdDocumentBuilder,
  RequestedWatchlistScreeningCheckBuilder,
  RequestedWatchlistAdvancedCaCheckBuilder,
  RequestedYotiAccountWatchlistAdvancedCaConfigBuilder,
  RequestedFuzzyMatchingStrategyBuilder,
  RequestedTypeListSourcesBuilder,
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

  const yotiAccountWatchListAdvancedCaConfig = new RequestedYotiAccountWatchlistAdvancedCaConfigBuilder()
    .withRemoveDeceased(true)
    .withShareUrl(true)
    .withSources(new RequestedTypeListSourcesBuilder()
      .withTypes(['pep', 'fitness-probity', 'warning'])
      .build())
    .withMatchingStrategy(new RequestedFuzzyMatchingStrategyBuilder()
      .withFuzziness(0.5)
      .build())
    .build();

  /**
   * Example of setting up Watchlist Advanced Config for a custom account
   * with search profile
   *
   const {
        RequestedCustomAccountWatchlistAdvancedCaConfigBuilder,
        RequestedSearchProfileSourcesBuilder,
    } = require('yoti');

   const customAccountWatchListAdvancedCaConfig =
      new RequestedCustomAccountWatchlistAdvancedCaConfigBuilder()
        .withRemoveDeceased(false)
        .withShareUrl(false)
        .withApiKey('your-api-key')
        .withMonitoring(false)
        .withClientRef('your-client-reference')
        .withTags({ tag1: 'tag1-value' })
        .withSources(new RequestedSearchProfileSourcesBuilder()
          .withSearchProfile('your-search-profile-id')
          .build())
        .withMatchingStrategy(new RequestedFuzzyMatchingStrategyBuilder()
          .withFuzziness(0.5)
          .build())
        .build();
   */

  const sessionSpec = new SessionSpecificationBuilder()
    .withClientSessionTokenTtl(600)
    .withResourcesTtl(86400)
    .withUserTrackingId('some-user-tracking-id')
    .withRequestedCheck(
      new RequestedWatchlistScreeningCheckBuilder()
        .withAdverseMediaCategory()
        .withSanctionsCategory()
        .build()
    )
    .withRequestedCheck(
      new RequestedWatchlistAdvancedCaCheckBuilder()
        .withConfig(yotiAccountWatchListAdvancedCaConfig)
        .build()
    )
    .withRequestedTask(
      new RequestedTextExtractionTaskBuilder()
        .withManualCheckFallback()
        .withChipDataDesired()
        .withCreateExpandedDocumentFields(true) // default is false
        .build()
    )
    .withRequiredDocument(
      (new RequiredIdDocumentBuilder()).build()
    )
    .withSdkConfig(
      new SdkConfigBuilder()
        .withAllowsCameraAndUpload()
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
