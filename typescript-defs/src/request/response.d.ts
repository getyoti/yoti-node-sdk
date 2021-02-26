/**
 * @class YotiResponse
 */
export class YotiResponse {
    /**
     * @param {*} parsedResponse
     * @param {int} statusCode
     * @param {Object|null} receipt
     * @param {Buffer|string|null} body
     * @param {Array|null} headers
     */
    constructor(parsedResponse: any, statusCode: any, receipt?: any | null, body?: Buffer | string | null, headers?: any[] | null);
    parsedResponse: any;
    statusCode: any;
    receipt: any;
    body: string | Buffer;
    headers: any[];
    /**
     * @returns {Object|null} Receipt if available.
     */
    getReceipt(): any | null;
    /**
     * @returns {*} Parsed API response.
     */
    getParsedResponse(): any;
    /**
     * @returns {Buffer|string|null} The response body.
     */
    getBody(): Buffer | string | null;
    /**
     * @returns {int} Response status code.
     */
    getStatusCode(): any;
    /**
     * @returns {Object.<string, string>} Response headers
     */
    getHeaders(): {
        [x: string]: string;
    };
}
