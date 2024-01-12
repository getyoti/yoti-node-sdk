'use strict';

const Validation = require('../../yoti_common/validation');

/**
 * Defines Extension for Share session.
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
    /** @private */
    this.type = type;

    Validation.notNull(content, 'content');
    /** @private */
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
   * Returns serialized data for JSON.stringify()
   */
  toJSON() {
    return {
      type: this.getType(),
      content: this.getContent(),
    };
  }
};
