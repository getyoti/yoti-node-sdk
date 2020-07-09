const FrameResponse = require('../../../../src/doc_scan_service/session/retrieve/frame.response');
const MediaResponse = require('../../../../src/doc_scan_service/session/retrieve/media.response');

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
