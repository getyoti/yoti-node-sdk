'use strict';

const Policy = require('./policy/policy');
const Extension = require('./extension/extension');
const Validation = require('../yoti_common/validation');
const ShareSessionNotification = require('./share.session.notification');

/**
 * Defines the Share session.
 *
 * @class ShareSession
 */
module.exports = class ShareSession {
  /**
   * @param {Policy} policy
   * @param {Extension[]} extensions
   * @param {Object} subject
   * @param {string} redirectUri
   * @param {ShareSessionNotification} notification
   */
  constructor(policy, extensions, subject, redirectUri, notification) {
    Validation.instanceOf(policy, Policy, 'policy');
    this.policy = policy;

    Validation.isArrayOfType(extensions, Extension, 'extensions');
    this.extensions = extensions;

    Validation.isString(redirectUri, 'redirectUri');
    this.redirectUri = redirectUri;

    if (subject) {
      Validation.isPlainObject(subject, 'subject');
      this.subject = subject;
    }

    if (notification) {
      Validation.instanceOf(notification, ShareSessionNotification, 'notification');
      this.notification = notification;
    }
  }

  /**
   * @returns {string} The redirect uri.
   */
  getRedirectUri() {
    return this.redirectUri;
  }

  /**
   * @returns {Policy} The customisable Policy to use in the share.
   */
  getPolicy() {
    return this.policy;
  }

  /**
   * @returns {Extension[]} List of Extension to be activated for the application.
   */
  getExtensions() {
    return this.extensions;
  }

  /**
   * @returns {Object} The subject describing data.
   */
  getSubject() {
    return this.subject;
  }

  /**
   * @returns {Object} The notification configuration.
   */
  getNotification() {
    return this.notification;
  }

  /**
   * @returns {Object} data for JSON.stringify()
   */
  toJSON() {
    return {
      notification: this.getNotification(),
      policy: this.getPolicy(),
      extensions: this.getExtensions(),
      subject: this.getSubject(),
      redirectUri: this.getRedirectUri(),
    };
  }
};
