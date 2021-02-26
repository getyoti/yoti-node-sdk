export = ZoomLivenessResourceResponse;
declare class ZoomLivenessResourceResponse extends LivenessResourceResponse {
    constructor(resource: any);
    faceMap: FaceMapResponse;
    frames: any;
    /**
     * @returns {FaceMapResponse}
     */
    getFaceMap(): FaceMapResponse;
    /**
     * @returns {FrameResponse[]}
     */
    getFrames(): FrameResponse[];
}
import LivenessResourceResponse = require("./liveness.resource.response");
import FaceMapResponse = require("./face.map.response");
import FrameResponse = require("./frame.response");
