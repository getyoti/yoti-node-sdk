'use strict';

const Validation = require('../../../yoti_common/validation');

class IdentityProfileFailureReasonResponse {
  constructor(failureReason) {
    Validation.isString(failureReason.reason_code, 'reason code');
    this.reasonCode = failureReason.reason_code;
  }

  getReasonCode() {
    return this.reasonCode;
  }
}

module.exports = IdentityProfileFailureReasonResponse;
