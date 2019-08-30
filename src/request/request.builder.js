'use strict';

const { Request } = require('./request');
const fs = require('fs');
const Validation = require('../yoti_common/validation');

/**
 * Builds a request.
 *
 * @class RequestBuilder
 */
class RequestBuilder {
  /**
   * Set initial properties.
   */
  constructor() {
    this.headers = {};
  }

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
   * @param {string} name
   * @param {string} value
   *
   * @returns {RequestBuilder}
   */
  withHeader(name, value) {
    Validation.isString(name, 'Header name');
    Validation.isString(value, `'${name}' header`);

    this.headers[name] = value;
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

    const request = new Request(this.baseUrl, this.pem);

    // Set custom headers.
    request.setHeaders(this.headers);

    return request;
  }
}

module.exports = {
  RequestBuilder,
};
