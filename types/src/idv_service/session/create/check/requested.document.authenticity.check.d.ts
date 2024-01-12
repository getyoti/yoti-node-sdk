export = RequestedDocumentAuthenticityCheck;
/**
 * Requests creation of a DocumentAuthenticityCheck
 *
 * @class RequestedDocumentAuthenticityCheck
 */
declare class RequestedDocumentAuthenticityCheck extends RequestedCheck {
    /**
     * @param {RequestedDocumentAuthenticityConfig} config
     */
    constructor(config: RequestedDocumentAuthenticityConfig);
}
import RequestedCheck = require("./requested.check");
import RequestedDocumentAuthenticityConfig = require("./requested.document.authenticity.config");
