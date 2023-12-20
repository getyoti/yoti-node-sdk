export = RequestedLivenessCheckBuilder;
/**
 * Builder to assist the creation of {@link RequestedLivenessCheck}.
 */
declare class RequestedLivenessCheckBuilder {
    maxRetries: number;
    /**
     * Sets the type to be of a ZOOM liveness check
     *
     * @returns {this}
     */
    forZoomLiveness(): this;
    /**
     * Sets the type to be of a Static liveness check
     *
     * @returns {this}
     */
    forStaticLiveness(): this;
    /**
     * Sets the type of the liveness check to the supplied value
     *
     * @param {string} livenessType
     *   The type of the liveness check
     *
     * @returns {this}
     */
    forLivenessType(livenessType: string): this;
    livenessType: string;
    /**
     * Sets the maximum number of retries allowed by the user
     *
     * @param {int} maxRetries
     *   The maximum number of retries
     *
     * @returns {this}
     */
    withMaxRetries(maxRetries: int): this;
    /**
     * Builds a {@link RequestedLivenessCheck} using the values supplied to the builder
     *
     * @returns {RequestedLivenessCheck}
     */
    build(): RequestedLivenessCheck;
}
import RequestedLivenessCheck = require("./requested.liveness.check");
