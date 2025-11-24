/**
 * @class YotiResponse
 */
class YotiResponse {
  private parsedResponse: any;
  private statusCode: number;
  private receipt: any;
  private body: Buffer | string | null;
  private headers: { [key: string]: string } | null;

  /**
   * @param {*} parsedResponse
   * @param {number} statusCode
   * @param {Object|null} receipt
   * @param {Buffer|string|null} body
   * @param {Object.<string, string>|null} headers
   */
  constructor(parsedResponse: any, statusCode: number, receipt: any = null, body: Buffer | string | null = null, headers: { [key: string]: string } | null = null) {
    this.parsedResponse = parsedResponse;
    this.statusCode = statusCode;
    this.receipt = receipt;
    this.body = body;
    this.headers = headers;
  }

  /**
   * @returns {Object|null} Receipt if available.
   */
  getReceipt() {
    return this.receipt;
  }

  /**
   * @returns {*} Parsed API response.
   */
  getParsedResponse() {
    return this.parsedResponse;
  }

  /**
   * @returns {Buffer|string|null} The response body.
   */
  getBody() {
    return this.body;
  }

  /**
   * @returns {number} Response status code.
   */
  getStatusCode() {
    return this.statusCode;
  }

  /**
   * @returns {Object.<string, string>} Response headers
   */
  getHeaders() {
    return this.headers;
  }
}

export {
  YotiResponse,
};
