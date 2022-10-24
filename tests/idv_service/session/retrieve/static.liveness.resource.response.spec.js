const StaticLivenessResourceResponse = require('../../../../src/idv_service/session/retrieve/static.liveness.resource.response');
const MediaResponse = require('../../../../src/idv_service/session/retrieve/media.response');

describe('StaticLivenessResourceResponse', () => {
  let staticLivenessResourceResponse;

  beforeEach(() => {
    staticLivenessResourceResponse = new StaticLivenessResourceResponse({
      liveness_type: 'some-liveness-type',
      id: 'some-id',
      image: {
        media: {},
      },
    });
  });

  describe('#getId', () => {
    it('should return ID', () => {
      expect(staticLivenessResourceResponse.getId()).toBe('some-id');
    });
  });

  describe('#getLivenessType', () => {
    it('should return liveness type', () => {
      expect(staticLivenessResourceResponse.getLivenessType()).toBe('some-liveness-type');
    });
  });

  describe('#getImage', () => {
    it('should return media', () => {
      expect(staticLivenessResourceResponse.getImage()).toBeInstanceOf(MediaResponse);
    });
  });
});
