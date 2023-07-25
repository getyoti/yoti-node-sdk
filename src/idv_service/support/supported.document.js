'use strict';

const Validation = require('../../yoti_common/validation');

class SupportedDocument {
  constructor(document) {
    Validation.isString(document.type, 'type', true);
    this.type = document.type;

    if (document.is_strictly_latin !== undefined) {
      Validation.isBoolean(document.is_strictly_latin);
      this.isStrictlyLatin = document.is_strictly_latin;
    }
  }

  getType() {
    return this.type;
  }

  getIsStrictlyLatin() {
    return this.isStrictlyLatin;
  }
}

module.exports = SupportedDocument;
