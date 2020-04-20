const Validation = require('../../../../yoti_common/validation');
const RequiredDocumentFilter = require('./required.document.filter');

class RequiredDocument {
  /**
   * @param {string} type
   * @param {RequiredDocumentFilter} filter
   */
  constructor(type, filter) {
    if (new.target === RequiredDocument) {
      throw TypeError('RequiredDocument cannot be instantiated');
    }

    Validation.isString(type, 'type');
    this.type = type;

    if (filter) {
      Validation.instanceOf(filter, RequiredDocumentFilter, 'filter');
      this.filter = filter;
    }
  }

  toJSON() {
    return {
      type: this.type,
      filter: this.filter,
    };
  }
}

module.exports = RequiredDocument;
