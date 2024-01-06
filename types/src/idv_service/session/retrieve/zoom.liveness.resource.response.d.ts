export = ZoomLivenessResourceResponse;
declare class ZoomLivenessResourceResponse extends LivenessResourceResponse {
    /** @private */
    private faceMap;
    /** @private */
    private frames;
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
