'use strict';

const Validation = require('../../../../../yoti_common/validation');
const AdvancedIdentityProfileReportResponse = require('./advanced.identity.profile.report.response');

class AdvancedIdentityProfileResponse {
  constructor(response) {
    Validation.isString(response.subject_id, 'subject_id');
    /** @private {string} */
    this.subjectId = response.subject_id;

    Validation.isString(response.result, 'result');
    /** @private {string} */
    this.result = response.result;

    Validation.isString(response.failure_reason, 'failure_reason', true);
    /** @private {string} */
    this.failureReason = response.failure_reason;

    if (response.identity_profile_report) {
      Validation.isPlainObject(response.identity_profile_report, 'identity_profile_report');
      /** @private {AdvancedIdentityProfileReportResponse} */
      // eslint-disable-next-line max-len
      this.identityProfileReport = new AdvancedIdentityProfileReportResponse(response.identity_profile_report);
    }
  }

  getSubjectId() {
    return this.subjectId;
  }

  getResult() {
    return this.result;
  }

  getFailureReason() {
    return this.failureReason;
  }

  getIdentityProfileReport() {
    return this.identityProfileReport;
  }
}

module.exports = AdvancedIdentityProfileResponse;
