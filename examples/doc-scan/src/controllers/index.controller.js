const config = require('../../config');

const {
  DocScanClient,
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

/**
 * Create a Doc Scan session.
 */
async function createSession() {
  const docScanClient = new DocScanClient(
    config.YOTI_CLIENT_SDK_ID,
    config.YOTI_PEM
  );

  const yotiAccountWatchListAdvancedCaConfig =
      new RequestedYotiAccountWatchlistAdvancedCaConfigBuilder()
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
    .withRequestedCheck(
      new RequestedLivenessCheckBuilder()
        .forZoomLiveness()
        .build()
    )
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

  return docScanClient.createSession(sessionSpec);
}

module.exports = async (req, res) => {
  try {
    const session = await createSession();

    req.session.DOC_SCAN_SESSION_ID = session.getSessionId();
    req.session.DOC_SCAN_SESSION_TOKEN = session.getClientSessionToken();

    res.render('pages/index', {
      iframeUrl: `${config.YOTI_DOC_SCAN_IFRAME_URL}?sessionID=${req.session.DOC_SCAN_SESSION_ID}&sessionToken=${req.session.DOC_SCAN_SESSION_TOKEN}`,
    });
  } catch (error) {
    res.render('pages/error', { error });
  }
};
