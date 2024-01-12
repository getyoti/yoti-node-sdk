export = RequestedDocumentAuthenticityCheckBuilder;
/**
 * Builder to assist the creation of {@link RequestedDocumentAuthenticityCheck}.
 *
 * @class RequestedDocumentAuthenticityCheckBuilder
 */
declare class RequestedDocumentAuthenticityCheckBuilder {
    /**
     * Requires that a manual follow-up check is always performed
     *
     * @returns {this}
     */
    withManualCheckAlways(): this;
    manualCheck: "ALWAYS" | "FALLBACK" | "NEVER";
    /**
     * Requires that a manual follow-up check is performed only on failed Checks,
     * and those with a low level of confidence
     *
     * @returns {this}
     */
    withManualCheckFallback(): this;
    /**
     * Requires that only an automated Check is performed.  No manual follow-up
     * Check will ever be initiated
     *
     * @returns {this}
     */
    withManualCheckNever(): this;
    /**
     * Build a {@link RequestedDocumentAuthenticityCheck} using the values supplied to the builder
     *
     * @returns {RequestedDocumentAuthenticityCheck}
     */
    build(): RequestedDocumentAuthenticityCheck;
}
import RequestedDocumentAuthenticityCheck = require("./requested.document.authenticity.check");
