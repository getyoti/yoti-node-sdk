'use strict';

const ShareSession = require('./share.session');

/**
 * Builder for share v2 sessions.
 *
 * @class ShareSessionBuilder
 */
module.exports = class ShareSessionBuilder {
  constructor() {
    this.extensions = [];
  }

  /**
   * @param {Object} subject
   */
  withSubject(subject) {
    this.subject = subject;
    return this;
  }

  /**
   * @param {DynamicPolicy} dynamicPolicy
   */
  withPolicy(dynamicPolicy) {
    this.dynamicPolicy = dynamicPolicy;
    return this;
  }

  /**
   * @param {string} redirectUri
   */
  withRedirectUri(redirectUri) {
    this.redirectUri = redirectUri;
    return this;
  }

  /**
   * @param {Extension} extension
   */
  withExtension(extension) {
    this.extensions.push(extension);
    return this;
  }

  /**
   * @param {ShareNotification} notification
   */
  withNotification(notification) {
    this.notification = notification;
    return this;
  }

  /**
   * @returns {ShareSession}
   */
  build() {
    return new ShareSession(
      this.dynamicPolicy,
      this.extensions,
      this.subject,
      this.redirectUri,
      this.notification
    );
  }
};
