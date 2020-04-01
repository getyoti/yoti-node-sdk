const Validation = require('../../../../../yoti_common/validation');
const DocumentRestriction = require('./document.restriction');

class DocumentRestrictionBuilder {
  constructor() {
    this.countryCodes = [];
    this.documentTypes = [];
  }

  withDocumentType(documentType) {
    Validation.isString(documentType, 'documentType');
    this.documentTypes.push(documentType);
    return this;
  }

  withCountryCode(countryCode) {
    Validation.isString(countryCode, 'countryCode');
    this.countryCodes.push(countryCode);
    return this;
  }

  build() {
    return new DocumentRestriction(this.documentTypes, this.countryCodes);
  }
}

module.exports = DocumentRestrictionBuilder;
