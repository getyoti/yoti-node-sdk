export = RequestedDocumentAuthenticityConfig;
/**
 * The configuration applied when creating a DocumentAuthenticityCheck
 *
 * @class RequestedDocumentAuthenticityConfig
 */
declare class RequestedDocumentAuthenticityConfig {
    /**
     * @param {string} manualCheck
     */
    constructor(manualCheck: string);
    manualCheck: string;
    /**
     * @returns {Object} data for JSON.stringify()
     */
    toJSON(): any;
}
