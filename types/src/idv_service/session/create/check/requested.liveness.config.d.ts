export = RequestedLivenessConfig;
/**
 * The configuration applied when creating a LivenessCheck
 *
 * @class RequestedLivenessConfig
 */
declare class RequestedLivenessConfig {
    /**
     * @param {number} maxRetries
     *   The maximum number of retries allowed by the user
     *   for a given liveness check
     * @param {string} livenessType
     *   The type of the liveness check
     */
    constructor(maxRetries: number, livenessType: string);
    /** @private */
    private maxRetries;
    /** @private */
    private livenessType;
    /**
     * @returns {Object} data for JSON.stringify()
     */
    toJSON(): any;
}
