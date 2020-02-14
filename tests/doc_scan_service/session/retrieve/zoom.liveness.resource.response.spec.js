
const ZoomLivenessResourceResponse = require('../../../../src/doc_scan_service/session/retrieve/zoom.liveness.resource.response');
const FaceMapResponse = require('../../../../src/doc_scan_service/session/retrieve/face.map.response');
const FrameResponse = require('../../../../src/doc_scan_service/session/retrieve/frame.response');

describe('ZoomLivenessResourceResponse', () => {
  let zoomLivenessResourceResponse;

  beforeEach(() => {
    zoomLivenessResourceResponse = new ZoomLivenessResourceResponse({
      facemap: {},
      frames: [
        {},
        {},
      ],
    });
  });

  describe('#getFaceMap', () => {
    it('should return face map', () => {
      expect(zoomLivenessResourceResponse.getFaceMap()).toBeInstanceOf(FaceMapResponse);
    });
  });

  describe('#getFrames', () => {
    it('should return array of frames', () => {
      const frames = zoomLivenessResourceResponse.getFrames();
      expect(frames.length).toBe(2);
      frames.forEach((frame) => {
        expect(frame).toBeInstanceOf(FrameResponse);
      });
    });
  });
});
