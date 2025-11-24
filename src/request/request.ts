import Validation = require('../yoti_common/validation');
import { Payload } from './payload';
import requestHandler = require('./request.handler');

const SUPPORTED_METHODS = ['POST', 'PUT', 'PATCH', 'GET', 'DELETE'];

/**
 * Represents a HTTP request message.
 *
 * @class YotiRequest
 */
class YotiRequest {
  private method: string;
  private url: string;
  private headers: { [key: string]: string };
  private payload: Payload | null;

  constructor(method: string, url: string, headers: { [key: string]: string }, payload: Payload | null = null) {
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
   * @returns {import('./payload').Payload|null}
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

export {
  YotiRequest,
};
