'use strict';

const Validation = require('../../../yoti_common/validation');

/**
 * @typedef {Object} RequirementsNotMetDetail
 * @property {string} [failureType]
 * @property {string} [documentType]
 * @property {string} [documentCountryIsoCode]
 * @property {string} [auditId]
 * @property {string} [details]
 */

class IdentityProfileFailureReasonResponse {
  constructor(failureReason) {
    Validation.isString(failureReason.reason_code, 'reason code');
    /** @private */
    this.reasonCode = failureReason.reason_code;

    /** @private  */
    this.requirementsNotMetDetails = [];

    // eslint-disable-next-line camelcase
    const { requirements_not_met_details: requirementsNotMetDetails } = failureReason;
    if (requirementsNotMetDetails) {
      Validation.isArray(requirementsNotMetDetails, 'requirements not met details');

      this.requirementsNotMetDetails = requirementsNotMetDetails.map((detail) => {
        const {
          failure_type: failureType,
          document_type: documentType,
          document_country_iso_code: documentCountryIsoCode,
          audit_id: auditId,
          details,
        } = detail;

        return ({
          failureType,
          documentType,
          documentCountryIsoCode,
          auditId,
          details,
        });
      });
    }
    /** @private */
  }

  getReasonCode() {
    return this.reasonCode;
  }

  /**
   * @returns {RequirementsNotMetDetail[]}
   */
  getRequirementsNotMetDetails() {
    return this.requirementsNotMetDetails;
  }
}

module.exports = IdentityProfileFailureReasonResponse;
