'use strict';

const Validation = require('../../../../../../yoti_common/validation');

class SupportedDocumentResponse {
  /**
   * @param {object} supportedDocument
   */
  constructor(supportedDocument) {
    Validation.isString(supportedDocument.type, 'type');
    this.type = supportedDocument.type;
    Validation.isBoolean(supportedDocument.is_strictly_latin);
    this.is_strictly_latin = supportedDocument.is_strictly_latin;
  }

  /**
   * Returns the type of document that is supported.
   *
   * @return {string | null}
   */
  getType() {
    return this.type;
  }

  getIsStrictlyLatin() {
    return this.is_strictly_latin;
  }
}

module.exports = SupportedDocumentResponse;
