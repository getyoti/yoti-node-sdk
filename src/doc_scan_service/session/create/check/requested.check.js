'use strict';

const Validation = require('../../../../yoti_common/validation');

/**
 * Represents a check to be performed on an identity
 * document within the Yoti Doc Scan system.
 *
 * @class RequestedCheck
 */
class RequestedCheck {
  /**
   * @param {string} type
   *   The type of the requested check
   * @param {*} config
   *   The configuration of the requested check
   */
  constructor(type, config) {
    if (new.target === RequestedCheck) {
      throw TypeError('RequestedCheck cannot be instantiated');
    }

    Validation.isString(type, 'type');
    this.type = type;

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
