'use strict';

const Validation = require('../../yoti_common/validation');
const SupportedDocument = require('./supported.document');

class SupportedCountry {
  constructor(country) {
    Validation.isString(country.code, 'code', true);
    /** @private */
    this.code = country.code;

    if (country.supported_documents) {
      /** @private */
      this.supportedDocuments = country.supported_documents
        .map((document) => new SupportedDocument(document));
    } else {
      /** @private */
      this.supportedDocuments = [];
    }
  }

  getCode() {
    return this.code;
  }

  getSupportedDocuments() {
    return this.supportedDocuments;
  }
}

module.exports = SupportedCountry;
