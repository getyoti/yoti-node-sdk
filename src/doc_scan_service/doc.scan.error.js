'use strict';

/**
 * @class DocScanError
 */
class DocScanError extends Error {
  constructor(error) {
    super(error.message);
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
