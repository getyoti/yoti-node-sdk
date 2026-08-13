const StaticLivenessResourceResponse = require('../../../../src/idv_service/session/retrieve/static.liveness.resource.response');
const MediaResponse = require('../../../../src/idv_service/session/retrieve/media.response');

describe('StaticLivenessResourceResponse', () => {
  let staticLivenessResourceResponse;

  beforeEach(() => {
    staticLivenessResourceResponse = new StaticLivenessResourceResponse({
      liveness_type: 'some-liveness-type',
      id: 'some-id',
      capture_type: 'some-capture-type',
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

  describe('#getCaptureType', () => {
    it('should return capture type', () => {
      expect(staticLivenessResourceResponse.getCaptureType()).toBe('some-capture-type');
    });
  });

  describe('#getImage', () => {
    it('should return media', () => {
      expect(staticLivenessResourceResponse.getImage()).toBeInstanceOf(MediaResponse);
    });
  });
});
