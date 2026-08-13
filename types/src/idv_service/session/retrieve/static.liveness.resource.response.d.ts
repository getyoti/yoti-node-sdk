export = StaticLivenessResourceResponse;
declare class StaticLivenessResourceResponse extends LivenessResourceResponse {
    /** @private */
    private captureType;
    /** @private */
    private image;
    /**
     * @returns {string}
     */
    getCaptureType(): string;
    /**
     * @returns {MediaResponse}
     */
    getImage(): MediaResponse;
}
import LivenessResourceResponse = require("./liveness.resource.response");
import MediaResponse = require("./media.response");
