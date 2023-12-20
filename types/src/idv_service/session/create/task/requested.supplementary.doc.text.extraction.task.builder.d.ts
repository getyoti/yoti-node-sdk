export = RequestedSupplementaryDocTextExtractionTaskBuilder;
/**
 * Builder to assist creation of {@link RequestedSupplementaryDocTextExtractionTask}.
 *
 * @class RequestedSupplementaryDocTextExtractionTaskBuilder
 */
declare class RequestedSupplementaryDocTextExtractionTaskBuilder {
    /**
     * Requires that the Task is always followed by a manual TextDataCheck
     *
     * @returns {this}
     */
    withManualCheckAlways(): this;
    manualCheck: "ALWAYS" | "FALLBACK" | "NEVER";
    /**
     * Requires that only failed Tasks are followed by a manual TextDataCheck
     *
     * @returns {this}
     */
    withManualCheckFallback(): this;
    /**
     * The SupplementaryTextExtractionTask will never fallback to a manual TextDataCheck
     *
     * @returns {this}
     */
    withManualCheckNever(): this;
    /**
     * Builds a {@link RequestedSupplementaryDocTextExtractionTask} using the values
     * supplied to the builder
     *
     * @returns {RequestedSupplementaryDocTextExtractionTask}
     */
    build(): RequestedSupplementaryDocTextExtractionTask;
}
import RequestedSupplementaryDocTextExtractionTask = require("./requested.supplementary.doc.text.extraction.task");
