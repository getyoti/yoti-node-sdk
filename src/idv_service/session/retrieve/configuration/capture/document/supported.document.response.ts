import Validation = require('../../../../../../yoti_common/validation');

class SupportedDocumentResponse {
  /**
   * @param {object} supportedDocument
   */
  constructor(supportedDocument) {
    Validation.isString(supportedDocument.type, 'type');
    /** @private */
    this.type = supportedDocument.type;
  }

  /**
   * Returns the type of document that is supported.
   *
   * @return {string | null}
   */
  getType() {
    return this.type;
  }
}

export default SupportedDocumentResponse;
