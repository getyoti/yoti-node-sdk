const Validation = require('../../../../yoti_common/validation');

class RequiredDocumentFilter {
  constructor(type) {
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
