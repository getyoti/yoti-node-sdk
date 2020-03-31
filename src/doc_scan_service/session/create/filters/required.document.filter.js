const Validation = require('../../../../yoti_common/validation');

class RequiredDocumentFilter {
  constructor(type) {
    Validation.isString(type, 'type');
    this.type = type;
  }
}

module.exports = RequiredDocumentFilter;
