export = RequestedTextExtractionTask;
/**
 * Requests that a TextExtractionTask be applied to each Document
 *
 * @class RequestedTextExtractionTask
 */
declare class RequestedTextExtractionTask extends RequestedTask {
    /**
     * @param {RequestedTextExtractionConfig} config
     */
    constructor(config: RequestedTextExtractionConfig);
}
import RequestedTask = require("./requested.task");
import RequestedTextExtractionConfig = require("./requested.text.extraction.config");
