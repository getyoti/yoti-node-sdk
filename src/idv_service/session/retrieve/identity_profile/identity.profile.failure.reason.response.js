'use strict';

const Validation = require('../../../../yoti_common/validation');
const IdentityProfileRequirementsNotMetDetailResponse = require('./identity.profile.requirements.not.met.detail.response');

class IdentityProfileFailureReasonResponse {
  constructor(failureReason) {
    Validation.isString(failureReason.reason_code, 'reason code');
    /** @private @type {string} */
    this.reasonCode = failureReason.reason_code;

    /** @private @type {IdentityProfileRequirementsNotMetDetailResponse[]} */
    this.requirementsNotMetDetails = [];

    // eslint-disable-next-line camelcase
    const { requirements_not_met_details: requirementsNotMetDetails } = failureReason;
    if (requirementsNotMetDetails) {
      Validation.isArray(requirementsNotMetDetails, 'requirements not met details');

      this.requirementsNotMetDetails = requirementsNotMetDetails
        // eslint-disable-next-line max-len
        .map((requirementsNotMetDetail) => new IdentityProfileRequirementsNotMetDetailResponse(requirementsNotMetDetail));
    }
  }

  getReasonCode() {
    return this.reasonCode;
  }

  getRequirementsNotMetDetails() {
    return this.requirementsNotMetDetails;
  }
}

module.exports = IdentityProfileFailureReasonResponse;
