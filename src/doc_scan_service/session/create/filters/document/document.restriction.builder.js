const Validation = require('../../../../../yoti_common/validation');
const DocumentRestriction = require('./document.restriction');

class DocumentRestrictionBuilder {
  constructor() {
    this.countryCodes = [];
    this.documentTypes = [];
  }

  withDocumentTypes(documentTypes) {
    Validation.isArrayOfStrings(documentTypes, 'documentType');
    this.documentTypes = documentTypes;
    return this;
  }

  withCountries(countryCodes) {
    Validation.isArrayOfStrings(countryCodes, 'countryCode');
    this.countryCodes = countryCodes;
    return this;
  }

  build() {
    return new DocumentRestriction(this.countryCodes, this.documentTypes);
  }
}

module.exports = DocumentRestrictionBuilder;
