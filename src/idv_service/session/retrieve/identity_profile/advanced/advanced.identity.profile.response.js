'use strict';

const Validation = require('../../../../../yoti_common/validation');
const AdvancedIdentityProfileReportResponse = require('./advanced.identity.profile.report.response');
const IdentityProfileFailureReasonResponse = require('../identity.profile.failure.reason.response');

class AdvancedIdentityProfileResponse {
  constructor(response) {
    Validation.isString(response.subject_id, 'subject_id');
    /** @private {string} */
    this.subjectId = response.subject_id;

    Validation.isString(response.result, 'result');
    /** @private {string} */
    this.result = response.result;

    if (response.failure_reason) {
      Validation.isPlainObject(response.failure_reason, 'failure_reason');
      /** @private {IdentityProfileFailureReasonResponse} */
      this.failureReason = new IdentityProfileFailureReasonResponse(response.failure_reason);
    }

    if (response.identity_profile_report) {
      Validation.isPlainObject(response.identity_profile_report, 'identity_profile_report');
      /** @private {AdvancedIdentityProfileReportResponse} */
      // eslint-disable-next-line max-len
      this.identityProfileReport = new AdvancedIdentityProfileReportResponse(response.identity_profile_report);
    }
  }

  /**
   * @returns {string}
   */
  getSubjectId() {
    return this.subjectId;
  }

  /**
   * @returns {string}
   */
  getResult() {
    return this.result;
  }

  /**
   * @returns {IdentityProfileFailureReasonResponse|undefined}
   */
  getFailureReason() {
    return this.failureReason;
  }

  /**
   * @returns {AdvancedIdentityProfileReportResponse|undefined}
   */
  getIdentityProfileReport() {
    return this.identityProfileReport;
  }
}

module.exports = AdvancedIdentityProfileResponse;
