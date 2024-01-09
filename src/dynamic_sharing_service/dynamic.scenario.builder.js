'use strict';

const DynamicScenario = require('./dynamic.scenario');

/**
 * Builder for DynamicScenario.
 *
 * @class DynamicScenarioBuilder
 */
module.exports = class DynamicScenarioBuilder {
  constructor() {
    /** @private */
    this.extensions = [];
  }

  /**
   * @param {string} callbackEndpoint
   */
  withCallbackEndpoint(callbackEndpoint) {
    this.callbackEndpoint = callbackEndpoint;
    return this;
  }

  /**
   * @typedef {import('./policy/dynamic.policy.js')} DynamicPolicy
   * @param {DynamicPolicy} dynamicPolicy
   */
  withPolicy(dynamicPolicy) {
    this.dynamicPolicy = dynamicPolicy;
    return this;
  }

  /**
   * @typedef {import('./extension/extension.js')} Extension
   *
   * @param {Extension} extension
   */
  withExtension(extension) {
    this.extensions.push(extension);
    return this;
  }

  /**
   * @param {Object} subject
   */
  withSubject(subject) {
    this.subject = subject;
    return this;
  }

  /**
   * @returns {DynamicScenario}
   */
  build() {
    return new DynamicScenario(
      this.callbackEndpoint,
      this.dynamicPolicy,
      this.extensions,
      this.subject
    );
  }
};
