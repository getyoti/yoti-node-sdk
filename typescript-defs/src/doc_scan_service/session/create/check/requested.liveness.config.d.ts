export = RequestedLivenessConfig;
/**
 * The configuration applied when creating a LivenessCheck
 *
 * @class RequestedLivenessConfig
 */
declare class RequestedLivenessConfig {
    /**
     * @param {int} maxRetries
     *   The maximum number of retries allowed by the user
     *   for a given liveness check
     * @param {string} livenessType
     *   The type of the liveness check
     */
    constructor(maxRetries: any, livenessType: string);
    maxRetries: any;
    livenessType: string;
    /**
     * @returns {Object} data for JSON.stringify()
     */
    toJSON(): any;
}
