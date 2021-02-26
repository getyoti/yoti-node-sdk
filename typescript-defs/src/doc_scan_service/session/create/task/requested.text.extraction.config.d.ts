export = RequestedTextExtractionConfig;
/**
 * The configuration applied when creating each TextExtractionTask
 *
 * @class RequestedTextExtractionConfig
 */
declare class RequestedTextExtractionConfig {
    /**
     * @param {string} manualCheck
     *   Describes the manual fallback behaviour applied to each Task
     * @param {string} chipData
     *   Describes the chip data requirement for each Task
     */
    constructor(manualCheck: string, chipData: string);
    manualCheck: string;
    chipData: string;
    /**
     * @returns {Object} data for JSON.stringify()
     */
    toJSON(): any;
}
