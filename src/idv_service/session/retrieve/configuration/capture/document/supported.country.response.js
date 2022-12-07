'use strict';

const Validation = require('../../../../../../yoti_common/validation');
const SupportedDocumentResponse = require('./supported.document.response');

class SupportedCountryResponse {
  /**
   * @param {object} supportedCountry
   */
  constructor(supportedCountry) {
    Validation.isString(supportedCountry.code, 'code');
    this.code = supportedCountry.code;

    if (supportedCountry.supported_documents) {
      Validation.isArray(supportedCountry.supported_documents);
      this.supportedDocuments = supportedCountry.supported_documents.map(
        (supportedDocument) => new SupportedDocumentResponse(supportedDocument)
      );
    }
  }

  /**
   * Returns the ISO Country Code of the supported country
   *
   * @return {string | null}
   */
  getCode() {
    return this.code;
  }

  /**
   * Returns a list of document types that are supported for the country code
   *
   * @return {SupportedDocumentResponse[] | null}
   */
  getSupportedDocuments() {
    return this.supportedDocuments;
  }
}

module.exports = SupportedCountryResponse;
