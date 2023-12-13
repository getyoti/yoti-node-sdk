export = IDVError;
/**
 * Signals that a problem occurred in a Yoti IDV call
 *
 * @class IDVError
 */
declare class IDVError extends Error {
    constructor(error: any);
    response: any;
    /**
     * @returns {int}
     */
    getResponseStatusCode(): int;
    /**
     * @returns {*} The parsed response body.
     */
    getResponseBody(): any;
}
