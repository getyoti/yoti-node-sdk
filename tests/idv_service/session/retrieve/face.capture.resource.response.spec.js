const FaceCaptureImageResponse = require('../../../../src/idv_service/session/retrieve/face.capture.image.response');
const FaceCaptureResourceResponse = require('../../../../src/idv_service/session/retrieve/face.capture.resource.response');

describe('FaceCaptureResourceResponse', () => {
  let faceCaptureResourceResponse;

  beforeEach(() => {
    faceCaptureResourceResponse = new FaceCaptureResourceResponse({ image: {} });
  });

  describe('#getImage', () => {
    it('should return image', () => {
      expect(faceCaptureResourceResponse.getImage()).toBeInstanceOf(
        FaceCaptureImageResponse
      );
    });
  });
});
