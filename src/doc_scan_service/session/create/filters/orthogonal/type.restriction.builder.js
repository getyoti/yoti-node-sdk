const Validation = require('../../../../../yoti_common/validation');
const TypeRestriction = require('./type.restriction');
const DocScanConstants = require('../../../../doc.scan.constants');

class TypeRestrictionBuilder {
  constructor() {
    this.documentTypes = [];
  }

  forWhitelist() {
    this.inclusion = DocScanConstants.INCLUSION_WHITELIST;
    return this;
  }

  forBlacklist() {
    this.inclusion = DocScanConstants.INCLUSION_BLACKLIST;
    return this;
  }

  withDocumentRestriction(documentType) {
    Validation.isString(documentType, 'documentType');
    this.documentTypes.push(documentType);
    return this;
  }

  build() {
    return new TypeRestriction(this.inclusion, this.documentTypes);
  }
}

module.exports = TypeRestrictionBuilder;
