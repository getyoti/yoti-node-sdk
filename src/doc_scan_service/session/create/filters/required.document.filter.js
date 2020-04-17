const Validation = require('../../../../yoti_common/validation');

class RequiredDocumentFilter {
  /**
   * @param {string} type
   */
  constructor(type) {
    if (new.target === RequiredDocumentFilter) {
      throw TypeError('RequiredDocumentFilter cannot be instantiated');
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

module.exports = RequiredDocumentFilter;
