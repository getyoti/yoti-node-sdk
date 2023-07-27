const FaceCaptureImageResponse = require('../../../../src/idv_service/session/retrieve/face.capture.image.response');
const MediaResponse = require('../../../../src/idv_service/session/retrieve/media.response');

describe('FaceCaptureImageResponse', () => {
  let faceCaptureImageResponse;

  beforeEach(() => {
    faceCaptureImageResponse = new FaceCaptureImageResponse({ media: {} });
  });

  describe('#getMedia', () => {
    it('should return media', () => {
      expect(faceCaptureImageResponse.getMedia()).toBeInstanceOf(MediaResponse);
    });
  });
});
