const FrameResponse = require('../../../../src/idv_service/session/retrieve/frame.response');
const PageResponse = require('../../../../src/idv_service/session/retrieve/page.response');
const MediaResponse = require('../../../../src/idv_service/session/retrieve/media.response');

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

  describe('#getExtractionImageIds', () => {
    describe('when extraction image IDs are available', () => {
      it('should return array of extraction image IDs', () => {
        const extractionImageIds = [
          '066a9372-0a52-4fe4-a026-866f8aee6fcb',
          '9b0c9c0a-ff30-41ed-815b-d95d63271d45',
        ];
        pageResponse = new PageResponse({
          extraction_image_ids: extractionImageIds,
        });
        expect(pageResponse.getExtractionImageIds().length).toBe(2);
        expect(pageResponse.getExtractionImageIds()).toEqual(extractionImageIds);
      });
    });
    describe('when extraction image IDs are not available', () => {
      it('should return empty array', () => {
        pageResponse = new PageResponse({});
        const extractionImageIds = pageResponse.getExtractionImageIds();
        expect(extractionImageIds).toBeInstanceOf(Array);
        expect(extractionImageIds.length).toBe(0);
      });
    });
  });
});
