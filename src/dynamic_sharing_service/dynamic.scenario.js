'use strict';

const DynamicPolicy = require('./policy/dynamic.policy');
const Extension = require('./extension/extension');
const Validation = require('../yoti_common/validation');

/**
 * Defines the Dynamic Scenario callback endpoint, policy
 * and extensions.
 *
 * @class DynamicScenario
 */
module.exports = class DynamicScenario {
  /**
   * @param {string} callbackEndpoint
   *   The device's callback endpoint. Must be a URL relative to the Application
   *   Domain specified in your Yoti Hub.
   * @param {DynamicPolicy} dynamicPolicy
   *   The customisable DynamicPolicy to use in the share.
   * @param {Extension[]} extensions
   *   List of Extension to be activated for the application.
   * @param {Object} subject
   *   The subject describing data.
   */
  constructor(callbackEndpoint, dynamicPolicy, extensions, subject) {
    Validation.isString(callbackEndpoint, 'callbackEndpoint');
    /** @private */
    this.callbackEndpoint = callbackEndpoint;

    Validation.instanceOf(dynamicPolicy, DynamicPolicy, 'dynamicPolicy');
    /** @private */
    this.dynamicPolicy = dynamicPolicy;

    Validation.isArrayOfType(extensions, Extension, 'extensions');
    /** @private */
    this.extensions = extensions;

    if (subject) {
      Validation.isPlainObject(subject, 'subject');
      /** @private */
      this.subject = subject;
    }
  }

  /**
   * @returns {string} The device's callback endpoint.
   */
  getCallbackEndpoint() {
    return this.callbackEndpoint;
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
   * @returns {Object} data for JSON.stringify()
   */
  toJSON() {
    return {
      callback_endpoint: this.getCallbackEndpoint(),
      policy: this.getDynamicPolicy(),
      extensions: this.getExtensions(),
      subject: this.getSubject(),
    };
  }
};
