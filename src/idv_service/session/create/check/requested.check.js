'use strict';

const Validation = require('../../../../yoti_common/validation');

/**
 * Requests creation of a Check to be performed on a document
 *
 * @class RequestedCheck
 */
class RequestedCheck {
  /**
   * @param {string} type
   *   The type of the Check to create
   * @param {*} config
   *   The configuration to apply to the Check
   */
  constructor(type, config) {
    if (new.target === RequestedCheck) {
      throw TypeError('RequestedCheck cannot be instantiated');
    }

    Validation.isString(type, 'type');
    this.type = type;

    Validation.notNullOrEmpty(config, 'config');
    this.config = config;
  }

  /**
   * @returns {Object} data for JSON.stringify()
   */
  toJSON() {
    return {
      type: this.type,
      config: this.config,
    };
  }
}

module.exports = RequestedCheck;
