export = LivenessResourceResponse;
declare class LivenessResourceResponse extends ResourceResponse {
    constructor(resource: any);
    livenessType: any;
    /**
     * @returns {string}
     */
    getLivenessType(): string;
}
import ResourceResponse = require("./resource.response");
