'use strict';

const LivenessResourceResponse = require('./liveness.resource.response');
const FrameResponse = require('./frame.response');
const FaceMapResponse = require('./face.map.response');
const Validation = require('../../../yoti_common/validation');

class ZoomLivenessResourceResponse extends LivenessResourceResponse {
  constructor(resource) {
    super(resource);

    if (resource.facemap) {
      this.faceMap = new FaceMapResponse(resource.facemap);
    }

    if (resource.frames) {
      Validation.isArray(resource.frames, 'frames');
      this.frames = resource.frames.map((frame) => new FrameResponse(frame));
    } else {
      this.frames = [];
    }
  }

  /**
   * @returns {FaceMapResponse}
   */
  getFaceMap() {
    return this.faceMap;
  }

  /**
   * @returns {FrameResponse[]}
   */
  getFrames() {
    return this.frames;
  }
}

module.exports = ZoomLivenessResourceResponse;
