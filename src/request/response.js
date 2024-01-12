'use strict';

/**
 * @class YotiResponse
 */
class YotiResponse {
  /**
   * @param {*} parsedResponse
   * @param {number} statusCode
   * @param {Object|null} receipt
   * @param {Buffer|string|null} body
   * @param {Object.<string, string>|null} headers
   */
  constructor(parsedResponse, statusCode, receipt = null, body = null, headers = null) {
    /** @private */
    this.parsedResponse = parsedResponse;
    /** @private */
    this.statusCode = statusCode;
    /** @private */
    this.receipt = receipt;
    /** @private */
    this.body = body;
    /** @private */
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

module.exports = {
  YotiResponse,
};
