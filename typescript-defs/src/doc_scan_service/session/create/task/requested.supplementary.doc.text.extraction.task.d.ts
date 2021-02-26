export = RequestedSupplementaryDocTextExtractionTask;
/**
 * Requests that a SupplementaryTextExtractionTask be applied to each Document
 *
 * @class RequestedSupplementaryDocTextExtractionTask
 */
declare class RequestedSupplementaryDocTextExtractionTask extends RequestedTask {
    /**
     * @param {RequestedSupplementaryTextExtractionConfig} config
     */
    constructor(config: RequestedSupplementaryTextExtractionConfig);
}
import RequestedTask = require("./requested.task");
import RequestedSupplementaryTextExtractionConfig = require("./requested.supplementary.doc.text.extraction.config");
