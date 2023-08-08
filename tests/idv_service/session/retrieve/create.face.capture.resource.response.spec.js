const CreateFaceCaptureResourceResponse = require('../../../../src/idv_service/session/retrieve/create.face.capture.resource.response');

describe('CreateFaceCaptureResourceResponse', () => {
  let faceCaptureResourceResponse;

  beforeEach(() => {
    faceCaptureResourceResponse = new CreateFaceCaptureResourceResponse({
      id: 'abc',
      frames: 3,
    });
  });

  describe('#getId', () => {
    it('should return id', () => {
      expect(faceCaptureResourceResponse.getId()).toBe('abc');
    });
  });

  describe('#getFrames', () => {
    it('should return frames', () => {
      expect(faceCaptureResourceResponse.getFrames()).toBe(3);
    });
  });
});
