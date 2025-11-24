import LivenessResourceResponse = require('./liveness.resource.response');
import FrameResponse = require('./frame.response');
import FaceMapResponse = require('./face.map.response');
import Validation = require('../../../yoti_common/validation');

class ZoomLivenessResourceResponse extends LivenessResourceResponse {
  private faceMap?: any;
  private frames: any[];

  constructor(resource: any) {
    super(resource);

    if (resource.facemap) {
      this.faceMap = new (FaceMapResponse as any)(resource.facemap);
    }

    if (resource.frames) {
      Validation.isArray(resource.frames, 'frames');
      this.frames = resource.frames.map((frame: any) => new (FrameResponse as any)(frame));
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

export default ZoomLivenessResourceResponse;
