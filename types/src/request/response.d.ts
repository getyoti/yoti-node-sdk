/**
 * @class YotiResponse
 */
export class YotiResponse {
    /**
     * @param {*} parsedResponse
     * @param {number} statusCode
     * @param {Object|null} receipt
     * @param {Buffer|string|null} body
     * @param {Array|null} headers
     */
    constructor(parsedResponse: any, statusCode: number, receipt?: any | null, body?: Buffer | string | null, headers?: any[] | null);
    parsedResponse: any;
    statusCode: number;
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
