'use strict';

const Validation = require('../../yoti_common/validation');

class SupportedDocument {
  constructor(document) {
    Validation.isString(document.type, 'type', true);
    this.type = document.type;
  }

  getType() {
    return this.type;
  }
}

module.exports = SupportedDocument;
