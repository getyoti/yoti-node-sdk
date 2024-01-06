'use strict';

const DetailsResponse = require('./details.response');
const Validation = require('../../../yoti_common/validation');

class BreakdownResponse {
  constructor(breakdown) {
    Validation.isString(breakdown.sub_check, 'sub_check', true);
    /** @private */
    this.subCheck = breakdown.sub_check;

    Validation.isString(breakdown.result, 'result', true);
    /** @private */
    this.result = breakdown.result;

    if (breakdown.details) {
      Validation.isArrayOfType(breakdown.details, Object, 'details');
      /** @private */
      this.details = breakdown.details.map((details) => new DetailsResponse(details));
    } else {
      /** @private */
      this.details = [];
    }
  }

  /**
   * @returns {string}
   */
  getSubCheck() {
    return this.subCheck;
  }

  /**
   * @returns {string}
   */
  getResult() {
    return this.result;
  }

  /**
   * @returns {DetailsResponse[]}
   */
  getDetails() {
    return this.details;
  }
}

module.exports = BreakdownResponse;
