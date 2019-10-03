'use strict';

const Validation = require('../yoti_common/validation');
const { Payload } = require('./payload');
const requestHandler = require('./request.handler');

const SUPPORTED_METHODS = ['POST', 'PUT', 'PATCH', 'GET', 'DELETE'];

/**
 * Represents a HTTP request message.
 *
 * @class YotiRequest
 */
class YotiRequest {
  constructor(method, url, headers, payload = null) {
    // Check if request method is supported
    if (SUPPORTED_METHODS.indexOf(method) === -1) {
      throw new Error(`HTTP method ${method} is not supported`);
    }
    this.method = method;

    if (payload !== null) {
      Validation.instanceOf(payload, Payload, 'payload');
    }
    this.payload = payload;

    Validation.isString(url, 'url');
    this.url = url;

    Validation.hasOnlyStringValues(headers, 'headers');
    this.headers = headers;
  }

  /**
   * @returns {string}
   */
  getMethod() {
    return this.method;
  }

  /**
   * @returns {string}
   */
  getUrl() {
    return this.url;
  }

  /**
   * @returns {Payload|null}
   */
  getPayload() {
    return this.payload;
  }

  /**
   * @returns {Object.<string, string>}
   */
  getHeaders() {
    return this.headers;
  }

  /**
   * Executes the request.
   *
   * @param {boolean} buffer Return the response as a Buffer.
   *
   * @returns {Promise} Resolves {YotiResponse}
   */
  execute(buffer = false) {
    return requestHandler.execute(this, buffer);
  }
}

module.exports = {
  YotiRequest,
};
