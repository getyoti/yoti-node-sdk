'use strict';

const Validation = require('../../../../yoti_common/validation');

/**
 * Requests creation of a Task to be performed on each document
 *
 * @class RequestedTask
 */
class RequestedTask {
  /**
   * @param {string} type
   *   The type of the Task to create
   * @param {*} config
   *   Configuration to apply to the Task
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
