'use strict';

const ShareSessionConfiguration = require('./share.session.configuration');

/**
 * @typedef {import('./policy/policy')} Policy
 * @typedef {import('./share.session.notification')} ShareSessionNotification
 * @typedef {import('./extension/extension')} Extension
 */

/**
 * Builder for Share sessions.
 *
 * @class ShareSessionBuilder
 */
module.exports = class ShareSessionBuilder {
  constructor() {
    /** @private */
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
   * @param {Policy} policy
   */
  withPolicy(policy) {
    this.policy = policy;
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
   * @returns {ShareSessionConfiguration}
   */
  build() {
    return new ShareSessionConfiguration(
      this.policy,
      this.extensions,
      this.subject,
      this.redirectUri,
      this.notification
    );
  }
};
