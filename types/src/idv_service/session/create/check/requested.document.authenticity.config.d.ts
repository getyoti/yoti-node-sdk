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
    /** @private */
    private manualCheck;
    /**
     * @returns {Object} data for JSON.stringify()
     */
    toJSON(): any;
}
