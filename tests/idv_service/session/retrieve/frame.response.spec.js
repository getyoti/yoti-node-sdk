const FrameResponse = require('../../../../src/idv_service/session/retrieve/frame.response');
const MediaResponse = require('../../../../src/idv_service/session/retrieve/media.response');

describe('FrameResponse', () => {
  let frameResponse;

  beforeEach(() => {
    frameResponse = new FrameResponse({
      media: {},
    });
  });

  describe('#getMedia', () => {
    it('should return media', () => {
      expect(frameResponse.getMedia()).toBeInstanceOf(MediaResponse);
    });
  });
});
