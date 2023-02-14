'use strict';

const Validation = require('../yoti_common/validation');

/**
 * Defines the Notification config for Share session.
 *
 * @class ShareSessionNotification
 */
module.exports = class ShareSessionNotification {
  /**
   * @param {string} url
   * @param {string} method
   * @param {Object} headers
   * @param {boolean} verifyTls
   */
  constructor(url, method, headers, verifyTls) {
    Validation.isString(url, 'Notification Url');
    this.url = url;

    if (method) {
      Validation.isString(method, 'Notification Method');
      this.method = method;
    }

    if (headers) {
      Validation.isPlainObject(headers, 'Notification Headers');
      this.headers = headers;
    }

    if (verifyTls) {
      Validation.isBoolean(verifyTls, 'Notification Verify TLS');
      this.verifyTls = verifyTls;
    }
  }

  /**
   * @returns {string} The notification url.
   */
  getUrl() {
    return this.url;
  }

  /**
   * @returns {string} The notification method.
   */
  getMethod() {
    return this.method;
  }

  /**
   * @returns {Object} The notification headers.
   */
  getHeaders() {
    return this.headers;
  }

  /**
   * @returns {boolean} The notification verifyTls option.
   */
  getVerifyTls() {
    return this.verifyTls;
  }

  toJSON() {
    return {
      url: this.url,
      method: this.method,
      headers: this.headers,
      verifyTls: this.verifyTls || true,
    };
  }
};
