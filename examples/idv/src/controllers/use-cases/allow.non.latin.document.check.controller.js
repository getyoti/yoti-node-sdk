const {
  IDVClient,
  SessionSpecificationBuilder,
  SdkConfigBuilder,
  RequiredIdDocumentBuilder,
  OrthogonalRestrictionsFilterBuilder,
  RequestedTextExtractionTaskBuilder,
  // DocumentRestrictionsFilterBuilder,
  // DocumentRestrictionBuilder,
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
    .withResourcesTtl(86400)
    .withUserTrackingId('some-user-tracking-id')
    .withRequestedTask(
      new RequestedTextExtractionTaskBuilder()
        .withManualCheckFallback()
        .build()
    )
    // With OrthogonalRestrictionsFilterBuilder
    .withRequiredDocument(
      (new RequiredIdDocumentBuilder())
        .withFilter(
          (new OrthogonalRestrictionsFilterBuilder())
            .withWhitelistedDocumentTypes(['DRIVING_LICENCE'])
            .withAllowNonLatinDocuments(true)
            .build()
        )
        .build()
    )
    // With DocumentRestrictionsFilterBuilder
    // .withRequiredDocument(
    //   (new RequiredIdDocumentBuilder())
    //     .withFilter(
    //       (new DocumentRestrictionsFilterBuilder())
    //         .withDocumentRestriction((new DocumentRestrictionBuilder())
    //           .withDocumentTypes(['DRIVING_LICENCE'])
    //           .build())
    //         .forWhitelist()
    //         .withAllowNonLatinDocuments(true)
    //         .build()
    //     )
    //     .build()
    // )
    .withSdkConfig(
      new SdkConfigBuilder()
        .withAllowsCameraAndUpload()
        .withLocale('en-GB')
        .withPresetIssuingCountry('GBR')
        .withSuccessUrl(`${config.YOTI_APP_BASE_URL}/success`)
        .withErrorUrl(`${config.YOTI_APP_BASE_URL}/error`)
        .build()
    )
    .build();

  return idvClient.createSession(sessionSpec);
}

// async function getListOfAllowedNonLatinDocuments() {
//   const idvClient = new IDVClient(config.YOTI_CLIENT_SDK_ID, config.YOTI_PEM);
//   const supportedDocumentsResponse = await idvClient.getSupportedDocuments(true);
//
//   console.log('\nThe list of allowed non Latin documents: \n');
//   supportedDocumentsResponse.getSupportedCountries().forEach((supportedCountry) => {
//     supportedCountry.getSupportedDocuments()
//       .filter((supportedDoc) => !supportedDoc.getIsStrictlyLatin())
//       .forEach((supportedDoc) => {
//         console.log(`${supportedDoc.getType()} of ${supportedCountry.getCode()}`);
//       });
//   });
// }
//
// async function getListOfStrictlyLatinDocuments() {
//   const idvClient = new IDVClient(config.YOTI_CLIENT_SDK_ID, config.YOTI_PEM);
//   const supportedDocumentsResponse = await idvClient.getSupportedDocuments(true);
//
//   console.log('\nThe list of strictly Latin documents: \n');
//   supportedDocumentsResponse.getSupportedCountries().forEach((supportedCountry) => {
//     supportedCountry.getSupportedDocuments()
//       .filter((supportedDoc) => supportedDoc.getIsStrictlyLatin())
//       .forEach((supportedDoc) => {
//         console.log(`${supportedDoc.getType()} of ${supportedCountry.getCode()}`);
//       });
//   });
// }

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
