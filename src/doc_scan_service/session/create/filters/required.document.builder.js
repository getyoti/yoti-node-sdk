const Validation = require('../../../../yoti_common/validation');
const RequiredDocumentFilter = require('./required.document.filter');

class RequiredDocumentBuilder {
  constructor() {
    if (new.target === RequiredDocumentBuilder) {
      throw TypeError('RequiredDocumentBuilder cannot be instantiated');
    }
  }

  withFilter(filter) {
    Validation.instanceOf(filter, RequiredDocumentFilter, 'filter');
    this.filter = filter;
    return this;
  }
}

module.exports = RequiredDocumentBuilder;
