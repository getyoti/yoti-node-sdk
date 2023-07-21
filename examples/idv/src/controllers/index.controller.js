const {
  IDVClient,
  SessionSpecificationBuilder,
  RequestedDocumentAuthenticityCheckBuilder,
  RequestedLivenessCheckBuilder,
  RequestedTextExtractionTaskBuilder,
  RequestedFaceMatchCheckBuilder,
  SdkConfigBuilder,
  RequiredIdDocumentBuilder,
  OrthogonalRestrictionsFilterBuilder,
  RequestedIdDocumentComparisonCheckBuilder,
  RequestedThirdPartyIdentityCheckBuilder,
  RequestedWatchlistScreeningCheckBuilder,
  RequestedWatchlistAdvancedCaCheckBuilder,
  RequestedYotiAccountWatchlistAdvancedCaConfigBuilder,
  RequestedFuzzyMatchingStrategyBuilder,
  RequestedTypeListSourcesBuilder,
  RequiredSupplementaryDocumentBuilder,
  ProofOfAddressObjectiveBuilder,
  RequestedSupplementaryDocTextExtractionTaskBuilder,
} = require('yoti');
const config = require('../../config');

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
    .withResourcesTtl(90000)
    .withUserTrackingId('some-user-tracking-id')
    .withRequestedCheck(
      new RequestedDocumentAuthenticityCheckBuilder()
        .withManualCheckAlways()
        .build()
    )
    // For zoom liveness check [only one type of liveness check to be enabled at a time]
    .withRequestedCheck(
      new RequestedLivenessCheckBuilder()
        .forZoomLiveness()
        .build()
    )
    // For static liveness check
    // .withRequestedCheck(
    //   new RequestedLivenessCheckBuilder()
    //     .forStaticLiveness()
    //     .build()
    // )
    .withRequestedCheck(
      new RequestedFaceMatchCheckBuilder()
        .withManualCheckNever()
        .build()
    )
    .withRequestedCheck(
      new RequestedIdDocumentComparisonCheckBuilder()
        .build()
    )
    .withRequestedCheck(
      new RequestedThirdPartyIdentityCheckBuilder()
        .build()
    )
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
        .withManualCheckAlways()
        .withChipDataDesired()
        .withCreateExpandedDocumentFields(true) // default is false
        .build()
    )
    .withRequestedTask(
      new RequestedSupplementaryDocTextExtractionTaskBuilder()
        .withManualCheckAlways()
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
        .withPrivacyPolicyUrl(`${config.YOTI_APP_BASE_URL}/privacy-policy`)
        .withAllowHandoff(true)
        .withEarlyBiometricConsentFlow() // or withJustInTimeBiometricConsentFlow()
        .withIdDocumentTextExtractionGenericRetries(5)
        .withIdDocumentTextExtractionReclassificationRetries(5)
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
    .build();

  return idvClient.createSession(sessionSpec);
}

module.exports = async (req, res) => {
  try {
    const session = await createSession();

    req.session.IDV_SESSION_ID = session.getSessionId();
    req.session.IDV_SESSION_TOKEN = session.getClientSessionToken();

    res.render('pages/index', {
      sessionId: req.session.IDV_SESSION_ID,
      iframeUrl: `${config.YOTI_IDV_IFRAME_URL}?sessionID=${req.session.IDV_SESSION_ID}&sessionToken=${req.session.IDV_SESSION_TOKEN}`,
    });
  } catch (error) {
    res.render('pages/error', { error });
  }
};
