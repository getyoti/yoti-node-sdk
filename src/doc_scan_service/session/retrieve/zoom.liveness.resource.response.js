'use strict';

const LivenessResourceResponse = require('./liveness.resource.response');
const FrameResponse = require('./frame.response');
const FaceMapResponse = require('./face.map.response');
const DocScanConstants = require('../../doc.scan.constants');
const Validation = require('../../../yoti_common/validation');

class ZoomLivenessResourceResponse extends LivenessResourceResponse {
  constructor(resource) {
    super(DocScanConstants.ZOOM, resource);

    if (resource.facemap) {
      this.faceMap = new FaceMapResponse(resource.facemap);
    }

    if (resource.frames) {
      Validation.isArray(resource.frames, 'frames');
      this.frames = resource.frames.map(frame => new FrameResponse(frame));
    }
  }

  getFaceMap() {
    return this.faceMap;
  }

  getFrames() {
    return this.frames;
  }
}

module.exports = ZoomLivenessResourceResponse;
