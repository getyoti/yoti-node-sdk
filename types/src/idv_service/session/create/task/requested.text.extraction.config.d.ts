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
     * @param {boolean} createExpandedDocumentFields
     *   Enables additional information
     */
    constructor(manualCheck: string, chipData: string, createExpandedDocumentFields: boolean);
    /** @private */
    private manualCheck;
    /** @private */
    private chipData;
    /** @private */
    private createExpandedDocumentFields;
    /**
     * @returns {Object} data for JSON.stringify()
     */
    toJSON(): any;
}
