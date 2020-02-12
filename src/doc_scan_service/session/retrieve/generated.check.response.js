'use strict';

const Validation = require('../../../yoti_common/validation');
const DocScanConstants = require('../../doc.scan.constants');

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["getType"] }] */
class GeneratedCheckResponse {
  constructor(check) {
    Validation.isString(check.id, 'id', true);
    this.id = check.id;
  }

  getId() {
    return this.id;
  }

  getType() {
    return DocScanConstants.ID_DOCUMENT_TEXT_DATA_CHECK;
  }
}

module.exports = GeneratedCheckResponse;
