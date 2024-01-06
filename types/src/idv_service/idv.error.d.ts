export = IDVError;
/**
 * Signals that a problem occurred in a Yoti IDV call
 *
 * @class IDVError
 */
declare class IDVError extends Error {
    constructor(error: any);
    /** @private */
    private response;
    /**
     * @returns {number|null}
     */
    getResponseStatusCode(): number | null;
    /**
     * @returns {string|object} The parsed response body.
     */
    getResponseBody(): string | object;
}
