/**
 * @class YotiResponse
 */
export class YotiResponse {
    /**
     * @param {*} parsedResponse
     * @param {number} statusCode
     * @param {Object|null} receipt
     * @param {Buffer|string|null} body
     * @param {Object.<string, string>|null} headers
     */
    constructor(parsedResponse: any, statusCode: number, receipt?: any | null, body?: Buffer | string | null, headers?: {
        [x: string]: string;
    } | null);
    /** @private */
    private parsedResponse;
    /** @private */
    private statusCode;
    /** @private */
    private receipt;
    /** @private */
    private body;
    /** @private */
    private headers;
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
     * @returns {number} Response status code.
     */
    getStatusCode(): number;
    /**
     * @returns {Object.<string, string>} Response headers
     */
    getHeaders(): {
        [x: string]: string;
    };
}
