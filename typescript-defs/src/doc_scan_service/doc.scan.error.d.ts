export = DocScanError;
/**
 * Signals that a problem occurred in a Yoti Doc Scan call
 *
 * @class DocScanError
 */
declare class DocScanError extends Error {
    constructor(error: any);
    response: any;
    /**
     * @returns {int}
     */
    getResponseStatusCode(): any;
    /**
     * @returns {*} The parsed response body.
     */
    getResponseBody(): any;
}
