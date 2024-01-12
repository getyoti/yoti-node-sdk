export = RequestedTextExtractionTaskBuilder;
/**
 * Builder to assist creation of {@link RequestedTextExtractionTask}.
 *
 * @class RequestedTextExtractionTaskBuilder
 */
declare class RequestedTextExtractionTaskBuilder {
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
     * The TextExtractionTask will never fallback to a manual TextDataCheck
     *
     * @returns {this}
     */
    withManualCheckNever(): this;
    /**
     * @returns {this}
     */
    withChipDataDesired(): this;
    chipData: "DESIRED" | "IGNORE";
    /**
     * @returns {this}
     */
    withChipDataIgnore(): this;
    /**
     * @param {boolean} createExpandedDocumentFields boolean
     * @returns {this}
     */
    withCreateExpandedDocumentFields(createExpandedDocumentFields: boolean): this;
    createExpandedDocumentFields: boolean;
    /**
     * Builds a {@link RequestedTextExtractionTask} using the values supplied to the builder
     *
     * @returns {RequestedTextExtractionTask}
     */
    build(): RequestedTextExtractionTask;
}
import RequestedTextExtractionTask = require("./requested.text.extraction.task");
