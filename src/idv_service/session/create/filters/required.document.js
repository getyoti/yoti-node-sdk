'use strict';

const Validation = require('../../../../yoti_common/validation');

class RequiredDocument {
  /**
   * @param {string} type
   */
  constructor(type) {
    if (new.target === RequiredDocument) {
      throw TypeError('RequiredDocument cannot be instantiated');
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

module.exports = RequiredDocument;
