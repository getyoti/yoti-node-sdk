'use strict';

const DynamicPolicy = require('../dynamic_sharing_service/policy/dynamic.policy');
const Extension = require('./extension/extension');
const Validation = require('../yoti_common/validation');
const ShareNotification = require('./share.notification');

/**
 * Defines the Dynamic Scenario callback endpoint, policy
 * and extensions.
 *
 * @class ShareSession
 */
module.exports = class ShareSession {
  /**
   * @param {DynamicPolicy} dynamicPolicy
   * @param {Extension[]} extensions
   * @param {Object} subject
   * @param {string} redirectUri
   * @param {ShareNotification} notification
   */
  constructor(dynamicPolicy, extensions, subject, redirectUri, notification) {
    // console.log(dynamicPolicy, extensions, subject, redirectUri, notification);
    Validation.instanceOf(dynamicPolicy, DynamicPolicy, 'dynamicPolicy');
    this.dynamicPolicy = dynamicPolicy;

    Validation.isArrayOfType(extensions, Extension, 'extensions');
    this.extensions = extensions;

    Validation.isString(redirectUri, 'redirectUri');
    this.redirectUri = redirectUri;

    if (subject) {
      Validation.isPlainObject(subject, 'subject');
      this.subject = subject;
    }

    if (notification) {
      Validation.instanceOf(notification, ShareNotification, 'notification');
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
   * @returns {DynamicPolicy} The customisable DynamicPolicy to use in the share.
   */
  getDynamicPolicy() {
    return this.dynamicPolicy;
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
      policy: this.getDynamicPolicy(),
      extensions: this.getExtensions(),
      subject: this.getSubject(),
      redirectUri: this.getRedirectUri(),
    };
  }
};
