'use strict';

const { Request } = require('./request');
const fs = require('fs');

/**
 * Builds a request.
 *
 * @class RequestBuilder
 */
class RequestBuilder {
  /**
   * @param {string} baseUrl
   *
   * @returns {RequestBuilder}
   */
  withBaseUrl(baseUrl) {
    this.baseUrl = baseUrl;
    return this;
  }

  /**
   * @param {string} pem
   *
   * @returns {RequestBuilder}
   */
  withPemString(pem) {
    this.pem = pem;
    return this;
  }

  /**
   * @param {string} filePath
   *
   * @returns {RequestBuilder}
   */
  withPemFilePath(filePath) {
    this.pem = fs.readFileSync(filePath, 'utf8');
    return this;
  }

  /**
   * @returns {SignedRequest}
   */
  build() {
    if (!this.baseUrl) {
      throw new Error('Base URL must be specified');
    }
    if (!this.pem) {
      throw new Error('PEM file path or string must be provided');
    }
    return new Request(this.baseUrl, this.pem);
  }
}

module.exports = {
  RequestBuilder,
};
