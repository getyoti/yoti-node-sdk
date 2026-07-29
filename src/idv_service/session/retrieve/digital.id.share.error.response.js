'use strict';

const Validation = require('../../../yoti_common/validation');

class DigitalIdShareErrorResponse {
  constructor(errorResponse) {
    Validation.isString(errorResponse.code, 'code', true);
    /** @private */
    this.code = errorResponse.code;

    Validation.isString(errorResponse.description, 'description', true);
    /** @private */
    this.description = errorResponse.description;
  }

  getCode() {
    return this.code;
  }

  getDescription() {
    return this.description;
  }
}

module.exports = DigitalIdShareErrorResponse;
