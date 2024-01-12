export = LivenessResourceResponse;
declare class LivenessResourceResponse extends ResourceResponse {
    /** @private */
    private livenessType;
    /**
     * @returns {string}
     */
    getLivenessType(): string;
}
import ResourceResponse = require("./resource.response");
