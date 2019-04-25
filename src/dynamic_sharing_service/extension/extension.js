'use strict';

const Validation = require('../../yoti_common/validation');

/**
 * Defines Extension for Dynamic Scenario.
 *
 * @class Extension
 */
module.exports = class Extension {
  /**
   * @param {string} type
   * @param {*} content
   */
  constructor(type, content) {
    Validation.isString(type, 'type');
    this.type = type;

    Validation.notNull(content, 'content');
    this.content = content;
  }

  /**
   * @returns {string} type
   */
  getType() {
    return this.type;
  }

  /**
   * @returns {*} content
   */
  getContent() {
    return this.content;
  }

  /**
   * @returns {Object} data for JSON.stringify()
   */
  toJSON() {
    return {
      type: this.getType(),
      content: this.getContent(),
    };
  }
};
