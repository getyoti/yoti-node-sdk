'use strict';

const Validation = require('../../../yoti_common/validation');
const IdentityProfileReportResponse = require('./identity.profile.report.response');

class IdentityProfileResponse {
  constructor(identityProfile) {
    Validation.isString(identityProfile.subject_id, 'subject_id', true);
    this.subjectId = identityProfile.subject_id;

    Validation.isString(identityProfile.result, 'result');
    this.result = identityProfile.result;

    Validation.isPlainObject(identityProfile.failure_reason, 'failure_reason');
    this.failureReason = identityProfile.failure_reason;

    Validation.isPlainObject(identityProfile.identity_profile_report, 'identity_profile_report');
    // eslint-disable-next-line max-len
    this.identityProfileReport = new IdentityProfileReportResponse(identityProfile.identity_profile_report);
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
   * @returns {object}
   */
  getFailureReason() {
    return this.failureReason;
  }

  /**
   * @returns {IdentityProfileReportResponse}
   */
  getIdentityProfileReport() {
    return this.identityProfileReport;
  }
}

module.exports = IdentityProfileResponse;
