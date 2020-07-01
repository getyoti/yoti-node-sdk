const ZoomLivenessResourceResponse = require('../../../../src/doc_scan_service/session/retrieve/zoom.liveness.resource.response');
const FaceMapResponse = require('../../../../src/doc_scan_service/session/retrieve/face.map.response');
const FrameResponse = require('../../../../src/doc_scan_service/session/retrieve/frame.response');

describe('ZoomLivenessResourceResponse', () => {
  let zoomLivenessResourceResponse;

  beforeEach(() => {
    zoomLivenessResourceResponse = new ZoomLivenessResourceResponse({
      liveness_type: 'some-liveness-type',
      id: 'some-id',
      facemap: {},
      frames: [
        {},
        {},
      ],
    });
  });

  describe('#getId', () => {
    it('should return ID', () => {
      expect(zoomLivenessResourceResponse.getId()).toBe('some-id');
    });
  });

  describe('#getLivenessType', () => {
    it('should return liveness type', () => {
      expect(zoomLivenessResourceResponse.getLivenessType()).toBe('some-liveness-type');
    });
  });

  describe('#getFaceMap', () => {
    it('should return FaceMap', () => {
      expect(zoomLivenessResourceResponse.getFaceMap()).toBeInstanceOf(FaceMapResponse);
    });
  });

  describe('#getFrames', () => {
    describe('when frames are available', () => {
      it('should return array of frames', () => {
        const frames = zoomLivenessResourceResponse.getFrames();
        expect(frames.length).toBe(2);
        frames.forEach((frame) => {
          expect(frame).toBeInstanceOf(FrameResponse);
        });
      });
    });
    describe('when frames are not available', () => {
      it('should return empty array', () => {
        zoomLivenessResourceResponse = new ZoomLivenessResourceResponse({});
        const frames = zoomLivenessResourceResponse.getFrames();
        expect(frames).toBeInstanceOf(Array);
        expect(frames.length).toBe(0);
      });
    });
  });
});
