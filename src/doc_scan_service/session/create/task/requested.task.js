'use strict';

const Validation = require('../../../../yoti_common/validation');

/**
 * Represents a requested task within the Doc Scan system.
 *
 * @class RequestedTask
 */
class RequestedTask {
  /**
   * @param {string} type
   *   The type of the requested task
   * @param {*} config
   *   The configuration properties associated with the requested task
   */
  constructor(type, config) {
    if (new.target === RequestedTask) {
      throw TypeError('RequestedTask cannot be instantiated');
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

module.exports = RequestedTask;
