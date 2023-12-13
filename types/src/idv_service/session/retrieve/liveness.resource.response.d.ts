export = LivenessResourceResponse;
declare class LivenessResourceResponse extends ResourceResponse {
    livenessType: any;
    /**
     * @returns {string}
     */
    getLivenessType(): string;
}
import ResourceResponse = require("./resource.response");
