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
   */
  constructor(parsedResponse, statusCode, receipt = null, body = null) {
    this.parsedResponse = parsedResponse;
    this.statusCode = statusCode;
    this.receipt = receipt;
    this.body = body;
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
}

module.exports = {
  YotiResponse,
};
