export = RequestedFaceMatchCheck;
/**
 * Requests creation of a FaceMatchCheck
 *
 * @class RequestedFaceMatchCheck
 */
declare class RequestedFaceMatchCheck extends RequestedCheck {
    /**
     * @param {RequestedFaceMatchCheckConfig} config
     */
    constructor(config: RequestedFaceMatchCheckConfig);
}
import RequestedCheck = require("./requested.check");
import RequestedFaceMatchCheckConfig = require("./requested.face.match.config");
