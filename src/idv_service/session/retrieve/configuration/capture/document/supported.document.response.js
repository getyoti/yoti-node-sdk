'use strict';

const Validation = require('../../../../../../yoti_common/validation');

class SupportedDocumentResponse {
  /**
   * @param {object} supportedDocument
   */
  constructor(supportedDocument) {
    Validation.isString(supportedDocument.type, 'type');
    /** @private */
    this.type = supportedDocument.type;

    if (supportedDocument.providers) {
      Validation.isArrayOfStrings(supportedDocument.providers, 'providers');
      /** @private */
      this.providers = supportedDocument.providers;
    }
  }

  /**
   * Returns the type of document that is supported.
   *
   * @return {string | null}
   */
  getType() {
    return this.type;
  }

  /**
   * Returns the digital ID providers supported for this document type.
   *
   * @return {string[] | null}
   */
  getProviders() {
    return this.providers;
  }
}

module.exports = SupportedDocumentResponse;
