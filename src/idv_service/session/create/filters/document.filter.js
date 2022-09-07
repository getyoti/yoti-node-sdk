'use strict';

const Validation = require('../../../../yoti_common/validation');

class DocumentFilter {
  /**
   * @param {string} type
   */
  constructor(type) {
    if (new.target === DocumentFilter) {
      throw TypeError('DocumentFilter cannot be instantiated');
    }

    Validation.isString(type, 'type');
    this.type = type;
  }

  toJSON() {
    return {
      type: this.type,
    };
  }
}

module.exports = DocumentFilter;
