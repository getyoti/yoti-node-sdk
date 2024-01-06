export = RequestedFaceComparisonConfig;
/**
 * The configuration applied when creating a FaceComparisonCheck
 *
 * @class RequestedFaceComparisonConfig
 */
declare class RequestedFaceComparisonConfig {
    /**
     * @param {string} manualCheck
     *   The value for a manual check for a given face match.
     */
    constructor(manualCheck: string);
    /** @private */
    private manualCheck;
    /**
     * @returns {Object} data for JSON.stringify()
     */
    toJSON(): any;
}
