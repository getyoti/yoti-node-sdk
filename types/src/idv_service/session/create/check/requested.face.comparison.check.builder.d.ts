export = RequestedFaceComparisonCheckBuilder;
/**
 * Builder to assist creation of {@link RequestedFaceComparisonCheck}.
 *
 * @class RequestedFaceComparisonCheckBuilder
 */
declare class RequestedFaceComparisonCheckBuilder {
    /**
     * Requires that only an automated Check is performed.  No manual follow-up
     * Check will ever be initiated
     *
     * @returns {this}
     */
    withManualCheckNever(): this;
    manualCheck: "NEVER";
    /**
     * Build a {@link RequestedFaceComparisonCheck} using the values supplied to the builder
     *
     * @returns {RequestedFaceComparisonCheck}
     */
    build(): RequestedFaceComparisonCheck;
}
import RequestedFaceComparisonCheck = require("./requested.face.comparison.check");
