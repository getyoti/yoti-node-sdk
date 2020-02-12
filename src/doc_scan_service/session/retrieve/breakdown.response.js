'use strict';

const Validation = require('../../../yoti_common/validation');

class BreakdownResponse {
  constructor(breakdown) {
    Validation.isString(breakdown.sub_check, 'sub_check', true);
    this.subCheck = breakdown.sub_check;

    Validation.isString(breakdown.result, 'result', true);
    this.result = breakdown.result;

    if (breakdown.details) {
      Validation.isArray(breakdown.details, 'details');
      this.details = breakdown.details;
    }
  }

  getSubCheck() {
    return this.subCheck;
  }

  getResult() {
    return this.result;
  }

  getDetails() {
    return this.details;
  }
}

module.exports = BreakdownResponse;
