const {
  IDVClient,
  SessionSpecificationBuilder,
  RequestedLivenessCheckBuilder,
  RequestedFaceMatchCheckBuilder,
  SdkConfigBuilder,
  RequestedFaceComparisonCheckBuilder,
  CreateFaceCaptureResourcePayloadBuilder,
  UploadFaceCaptureImagePayloadBuilder,
} = require('yoti');
const config = require('../../config');

/**
 * Create an IDV session.
 */
async function createSession() {
  const idvClient = new IDVClient(config.YOTI_CLIENT_SDK_ID, config.YOTI_PEM);

  const sessionSpec = new SessionSpecificationBuilder()
    .withClientSessionTokenTtl(600)
    .withResourcesTtl(90000)
    .withUserTrackingId('some-user-tracking-id')

  // For zoom liveness check [only one type of liveness check to be enabled at a time]
    .withRequestedCheck(new RequestedLivenessCheckBuilder()
      .forZoomLiveness()
      .build())
  // For static liveness check
  // .withRequestedCheck(
  //   new RequestedLivenessCheckBuilder()
  //     .forStaticLiveness()
  //     .build()
  // )
    .withRequestedCheck(new RequestedFaceMatchCheckBuilder()
      .withManualCheckNever()
      .build())

    .withRequestedCheck(new RequestedFaceComparisonCheckBuilder()
      .withManualCheckNever()
      .build())

    .withSdkConfig(new SdkConfigBuilder()
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
      .build())

    .build();

  return idvClient.createSession(sessionSpec);
}

async function addFaceCaptureResourceToSession(sessionId) {
  const idvClient = new IDVClient(config.YOTI_CLIENT_SDK_ID, config.YOTI_PEM);

  const sessionConfiguration = await idvClient.getSessionConfiguration(sessionId);

  const faceCaptureResourceRequirements = sessionConfiguration.getCapture().getFaceCaptureResourceRequirements();

  if (faceCaptureResourceRequirements.length) {
    const [firstRequirement] = faceCaptureResourceRequirements;

    const createFaceCaptureResourcePayload = new CreateFaceCaptureResourcePayloadBuilder()
      .withRequirementId(firstRequirement.getId())
      .build();

    const faceCaptureResource = await idvClient.createFaceCaptureResource(sessionId, createFaceCaptureResourcePayload);

    // eslint-disable-next-line max-len
    const base64PngImage = 'iVBORw0KGgoAAAANSUhEUgAAAsAAAAGMAQMAAADuk4YmAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAADlJREFUeF7twDEBAAAAwiD7p7bGDlgYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAGJrAABgPqdWQAAAABJRU5ErkJggg==';

    const uploadFaceCaptureImagePayload = new UploadFaceCaptureImagePayloadBuilder()
      .forPngImage()
      .withImageContents(Buffer.from(base64PngImage, 'base64'))
      .build();

    await idvClient.uploadFaceCaptureImage(sessionId, faceCaptureResource.getId(), uploadFaceCaptureImagePayload);
  }
}

module.exports = async (req, res) => {
  try {
    const session = await createSession();
    const sessionId = session.getSessionId();
    const sessionToken = session.getClientSessionToken();

    req.session.IDV_SESSION_ID = sessionId;
    req.session.IDV_SESSION_TOKEN = sessionToken;

    try {
      await addFaceCaptureResourceToSession(sessionId);
    } catch (e) {
    }

    res.render('pages/index', {
      sessionId,
      iframeUrl: `${config.YOTI_IDV_IFRAME_URL}?sessionID=${sessionId}&sessionToken=${req.session.IDV_SESSION_TOKEN}`,
    });
  } catch (error) {
    res.render('pages/error', { error });
  }
};
