'use strict';

const ShareSessionConfiguration = require('./share.session.configuration');

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
   * @param {ShareSessionNotification} notification
   */
  withNotification(notification) {
    this.notification = notification;
    return this;
  }

  /**
   * @returns {ShareSession}
   */
  build() {
    return new ShareSessionConfiguration(
      this.dynamicPolicy,
      this.extensions,
      this.subject,
      this.redirectUri,
      this.notification
    );
  }
};
