export = RequestedSupplementaryDocTextExtractionConfig;
/**
 * The configuration applied when creating each RequestedSupplementaryDocTextExtraction
 *
 * @class RequestedSupplementaryDocTextExtractionConfig
 */
declare class RequestedSupplementaryDocTextExtractionConfig {
    /**
     * @param {string} manualCheck
     *   Describes the manual fallback behaviour applied to each Task
     */
    constructor(manualCheck: string);
    manualCheck: string;
    /**
     * @returns {Object} data for JSON.stringify()
     */
    toJSON(): any;
}
