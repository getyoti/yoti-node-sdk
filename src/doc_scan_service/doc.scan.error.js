'use strict';

/**
 * @param {Error} error
 */
function errorMessage(error) {
  if (
    error.response
    && error.response.body
    && error.response.body.code
    && error.response.body.message
  ) {
    const message = `${error.response.body.code} - ${error.response.body.message}`;

    if (error.response.body.errors) {
      return `${message}: ${JSON.stringify(error.response.body.errors)}`;
    }

    return message;
  }

  return error.message;
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
