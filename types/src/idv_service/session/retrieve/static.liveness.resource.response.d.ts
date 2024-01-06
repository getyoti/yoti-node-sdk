export = StaticLivenessResourceResponse;
declare class StaticLivenessResourceResponse extends LivenessResourceResponse {
    /** @private */
    private image;
    /**
     * @returns {MediaResponse}
     */
    getImage(): MediaResponse;
}
import LivenessResourceResponse = require("./liveness.resource.response");
import MediaResponse = require("./media.response");
