'use strict';

/**
 * @param {Error} error
 */
function errorMessage(error) {
  if (!error.response || !error.response.text) {
    return error.message;
  }
  return `${error.message}: ${error.response.text}`;
}

/**
 * Signals that a problem occurred in a Yoti Doc Scan call
 *
 * @class DocScanError
 */
class DocScanError extends Error {
  constructor(error) {
    super(errorMessage(error));

    this.name = this.constructor.name;
    this.response = error.response || null;
  }

  /**
   * @returns {int}
   */
  getResponseStatusCode() {
    if (this.response && this.response.statusCode) {
      return this.response.statusCode;
    }
    return null;
  }

  /**
   * @returns {*} The parsed response body.
   */
  getResponseBody() {
    if (this.response && this.response.body) {
      return this.response.body;
    }
    return null;
  }
}

module.exports = DocScanError;
