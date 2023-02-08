'use strict';

const ShareNotification = require('./share.notification');

/**
 * Builder for share v2 notifications.
 *
 * @class ShareNotificationBuilder
 */
module.exports = class ShareNotificationBuilder {
  constructor() {
    this.headers = {};
  }

  /**
   * @param {string} url
   */
  withUrl(url) {
    this.url = url;
    return this;
  }

  /**
   * @param {string} method
   */
  withMethod(method) {
    this.method = method;
    return this;
  }

  /**
   * @param {string} headerName
   * @param {string} value
   */
  withHeader(headerName, value) {
    this.headers[headerName] = value;
    return this;
  }

  /**
   * @param {boolean} verifyTls
   */
  withVerifiedTls(verifyTls) {
    this.verifyTls = verifyTls;
    return this;
  }

  build() {
    return new ShareNotification(
      this.url,
      this.method,
      this.headers,
      this.verifyTls
    );
  }
};
