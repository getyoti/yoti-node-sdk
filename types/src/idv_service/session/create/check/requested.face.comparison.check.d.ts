export = RequestedFaceComparisonCheck;
/**
 * Requests creation of a FaceComparisonCheck
 *
 * @class RequestedFaceComparisonCheck
 */
declare class RequestedFaceComparisonCheck extends RequestedCheck {
    /**
     * @param {RequestedFaceComparisonCheckConfig} config
     */
    constructor(config: RequestedFaceComparisonCheckConfig);
}
import RequestedCheck = require("./requested.check");
import RequestedFaceComparisonCheckConfig = require("./requested.face.comparison.config");
