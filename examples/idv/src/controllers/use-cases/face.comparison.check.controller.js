const {
  IDVClient,
  SessionSpecificationBuilder,
  SdkConfigBuilder,
  RequestedLivenessCheckBuilder,
  RequestedFaceComparisonCheckBuilder,
  CreateFaceCaptureResourcePayloadBuilder,
  UploadFaceCaptureImagePayloadBuilder,
} = require('yoti');
const config = require('../../../config');

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
    .withRequestedCheck(new RequestedFaceComparisonCheckBuilder()
      .withManualCheckNever()
      .build())
    .withSdkConfig(new SdkConfigBuilder()
      .withSuccessUrl(`${config.YOTI_APP_BASE_URL}/success`)
      .withErrorUrl(`${config.YOTI_APP_BASE_URL}/error`)
      .withPrivacyPolicyUrl(`${config.YOTI_APP_BASE_URL}/privacy-policy`)
      .withJustInTimeBiometricConsentFlow() // or withEarlyBiometricConsentFlow()
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
    const imageBuffer = Buffer.from(base64PngImage, 'base64');

    // Note: below describes how to directly get the image buffer, while the example uses a white pixel in base64 format, then converted into a buffer
    // const imageBuffer = fs.readFileSync(`path-to-image.png`)

    const uploadFaceCaptureImagePayload = new UploadFaceCaptureImagePayloadBuilder()
      .forPngImage()
      .withImageContents(imageBuffer)
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

    await addFaceCaptureResourceToSession(sessionId);

    res.render('pages/session', {
      sessionId,
      iframeUrl: `${config.YOTI_IDV_IFRAME_URL}?sessionID=${sessionId}&sessionToken=${req.session.IDV_SESSION_TOKEN}`,
    });
  } catch (error) {
    res.render('pages/error', { error });
  }
};
