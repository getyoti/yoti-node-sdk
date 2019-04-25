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
   * @param {DynamicPolicy} dynamicPolicy
   * @param {Extension[]} extensions
   */
  constructor(callbackEndpoint, dynamicPolicy, extensions) {
    Validation.isString(callbackEndpoint, 'callbackEndpoint');
    this.callbackEndpoint = callbackEndpoint;

    Validation.instanceOf(dynamicPolicy, DynamicPolicy, 'dynamicPolicy');
    this.dynamicPolicy = dynamicPolicy;

    Validation.isArrayOfType(extensions, Extension, 'extensions');
    this.extensions = extensions;
  }

  /**
   * @returns {Object} data for JSON.stringify()
   */
  toJSON() {
    return {
      callback_endpoint: this.callbackEndpoint,
      policy: this.dynamicPolicy,
      extensions: this.extensions,
    };
  }
};
