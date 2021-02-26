export = RequestedFaceMatchCheckBuilder;
/**
 * Builder to assist creation of {@link RequestedFaceMatchCheck}.
 *
 * @class RequestedFaceMatchCheckBuilder
 */
declare class RequestedFaceMatchCheckBuilder {
    /**
     * Requires that a manual follow-up check is always performed
     *
     * @returns {this}
     */
    withManualCheckAlways(): this;
    manualCheck: string;
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
     * Build a {@link RequestedFaceMatchCheck} using the values supplied to the builder
     *
     * @returns {RequestedFaceMatchCheck}
     */
    build(): RequestedFaceMatchCheck;
}
import RequestedFaceMatchCheck = require("./requested.face.match.check");
