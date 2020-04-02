const Validation = require('../../../../../yoti_common/validation');

class DocumentRestriction {
  constructor(documentTypes, countryCodes) {
    if (documentTypes && documentTypes.length > 0) {
      Validation.isArrayOfStrings(documentTypes, 'documentTypes');
      this.documentTypes = documentTypes;
    }

    if (countryCodes && countryCodes.length > 0) {
      Validation.isArrayOfStrings(countryCodes, 'countryCodes');
      this.countryCodes = countryCodes;
    }
  }

  toJSON() {
    return {
      document_types: this.documentTypes,
      country_codes: this.countryCodes,
    };
  }
}

module.exports = DocumentRestriction;
