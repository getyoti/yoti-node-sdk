const FaceMapResponse = require('../../../../src/idv_service/session/retrieve/face.map.response');
const MediaResponse = require('../../../../src/idv_service/session/retrieve/media.response');

describe('FaceMapResponse', () => {
  let faceMapResponse;

  beforeEach(() => {
    faceMapResponse = new FaceMapResponse({
      media: {},
    });
  });

  describe('#getMedia', () => {
    it('should return media', () => {
      expect(faceMapResponse.getMedia()).toBeInstanceOf(MediaResponse);
    });
  });
});
