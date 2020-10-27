'use strict';

const Validation = require('../../../../../yoti_common/validation');

class DocumentRestriction {
  /**
   * @param {string[]} countryCodes
   * @param {string[]} documentTypes
   */
  constructor(countryCodes, documentTypes) {
    if (countryCodes) {
      Validation.isArrayOfStrings(countryCodes, 'countryCodes');
      this.countryCodes = countryCodes;
    }

    if (documentTypes) {
      Validation.isArrayOfStrings(documentTypes, 'documentTypes');
      this.documentTypes = documentTypes;
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
