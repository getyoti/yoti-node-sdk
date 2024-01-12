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
     * @returns {string|object|null} The parsed response body.
     */
    getResponseBody(): string | object | null;
}
declare namespace IDVError {
    export { ResponseBody, Response, APIError };
}
type ResponseBody = {
    message?: string;
    code?: string;
    errors?: any[];
};
type Response = {
    body?: ResponseBody;
};
type APIError = {
    response?: Response;
    message?: string;
};
