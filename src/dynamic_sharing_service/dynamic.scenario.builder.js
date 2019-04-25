'use strict';

const DynamicScenario = require('./dynamic.scenario');

/**
 * Builder for DynamicScenario.
 *
 * @class DynamicScenarioBuilder
 */
module.exports = class DynamicScenarioBuilder {
  constructor() {
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
   * @param {DynamicPolicy} dynamicPolicy
   */
  withPolicy(dynamicPolicy) {
    this.dynamicPolicy = dynamicPolicy;
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
   * @returns {DynamicScenario}
   */
  build() {
    return new DynamicScenario(this.callbackEndpoint, this.dynamicPolicy, this.extensions);
  }
};
