'use strict';

const Validation = require('../../yoti_common/validation');

class SupportedDocument {
  constructor(document) {
    Validation.isString(document.type, 'type', true);
    this.type = document.type;

    Validation.isBoolean(document.is_strictly_latin, 'is_strictly_latin', true);
    this.isStrictlyLatin = document.is_strictly_latin;
  }

  /**
   *
   * @return {string|undefined}
   */
  getType() {
    return this.type;
  }

  /**
   *
   * @return {boolean|undefined}
   */
  getIsStrictlyLatin() {
    return this.isStrictlyLatin;
  }
}

module.exports = SupportedDocument;
