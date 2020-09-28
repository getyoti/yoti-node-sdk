const FrameResponse = require('../../../../src/doc_scan_service/session/retrieve/frame.response');
const PageResponse = require('../../../../src/doc_scan_service/session/retrieve/page.response');
const MediaResponse = require('../../../../src/doc_scan_service/session/retrieve/media.response');

describe('PageResponse', () => {
  let pageResponse;

  beforeEach(() => {
    pageResponse = new PageResponse({
      capture_method: 'some-capture-method',
      media: {},
      frames: [{}, {}],
    });
  });

  describe('#getCaptureMethod', () => {
    it('should return capture method', () => {
      expect(pageResponse.getCaptureMethod()).toBe('some-capture-method');
    });
  });

  describe('#getMedia', () => {
    it('should return media', () => {
      expect(pageResponse.getMedia()).toBeInstanceOf(MediaResponse);
    });
  });

  describe('#getFrames', () => {
    describe('when frames are available', () => {
      it('should return array of frames', () => {
        const frames = pageResponse.getFrames();
        expect(frames.length).toBe(2);
        frames.forEach((frame) => {
          expect(frame).toBeInstanceOf(FrameResponse);
        });
      });
    });
    describe('when frames are not available', () => {
      it('should return empty array', () => {
        pageResponse = new PageResponse({});
        const frames = pageResponse.getFrames();
        expect(frames).toBeInstanceOf(Array);
        expect(frames.length).toBe(0);
      });
    });
  });
});
