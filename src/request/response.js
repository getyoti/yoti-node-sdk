'use strict';

/**
 * @class YotiResponse
 */
class YotiResponse {
  /**
   * @param {*} parsedResponse
   * @param {int} statusCode
   * @param {Object|null} receipt
   * @param {Buffer|string|null} body
   * @param {Array|null} headers
   */
  constructor(parsedResponse, statusCode, receipt = null, body = null, headers = null) {
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
   * @returns {int} Response status code.
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

module.exports = {
  YotiResponse,
};
