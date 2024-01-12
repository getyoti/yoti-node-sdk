export = RequestedLivenessCheck;
/**
 * Requests creation of a LivenessCheck
 *
 * @class RequestedLivenessCheck
 */
declare class RequestedLivenessCheck extends RequestedCheck {
    /**
     * @param {RequestedLivenessConfig} config
     */
    constructor(config: RequestedLivenessConfig);
}
import RequestedCheck = require("./requested.check");
import RequestedLivenessConfig = require("./requested.liveness.config");
