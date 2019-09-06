'use strict';

/**
 * @class YotiResponse
 */
class YotiResponse {
  /**
   * @param {*} parsedResponse
   * @param {int} statusCode
   * @param {Object|null} receipt
   */
  constructor(parsedResponse, statusCode, receipt = null) {
    this.parsedResponse = parsedResponse;
    this.statusCode = statusCode;
    this.receipt = receipt;
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
   * @returns {int} Response status code.
   */
  getStatusCode() {
    return this.statusCode;
  }
}

module.exports = {
  YotiResponse,
};
