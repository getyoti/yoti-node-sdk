'use strict';

const ShareSessionNotification = require('./share.session.notification');

/**
 * Builder for Share session notifications.
 *
 * @class ShareSessionNotificationBuilder
 */
module.exports = class ShareSessionNotificationBuilder {
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
    return new ShareSessionNotification(
      this.url,
      this.method,
      this.headers,
      this.verifyTls
    );
  }
};
