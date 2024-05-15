'use strict';

const Validation = require('../../../yoti_common/validation');
const IdentityProfileRequirementsNotMetDetailResponse = require('./identity.profile.requirements.not.met.detail.response');

class IdentityProfileReportSchemesComplianceResponse {
  constructor(schemesCompliance) {
    Validation.isPlainObject(schemesCompliance.scheme, 'scheme');
    /** @private */
    this.scheme = schemesCompliance.scheme;

    Validation.isBoolean(schemesCompliance.requirements_met, 'requirements_met');
    /** @private @type {boolean} */
    this.requirementsMet = schemesCompliance.requirements_met;

    if (schemesCompliance.requirements_not_met_info) {
      Validation.isString(schemesCompliance.requirements_not_met_info, 'requirements_not_met_info');
      /** @private @type {string|undefined} */
      this.requirementsNotMetInfo = schemesCompliance.requirements_not_met_info;

      /** @private @type {IdentityProfileRequirementsNotMetDetailResponse[]|undefined} */
      this.requirementsNotMetDetails = [];

      if (schemesCompliance.requirements_not_met_details) {
        Validation.isArray(schemesCompliance.requirements_not_met_details, 'requirements not met details');

        this.requirementsNotMetDetails = schemesCompliance.requirements_not_met_details
        // eslint-disable-next-line max-len
          .map((requirementsNotMetDetail) => new IdentityProfileRequirementsNotMetDetailResponse(requirementsNotMetDetail));
      }
    }
  }

  /**
   * @returns {object}
   */
  getScheme() {
    return this.scheme;
  }

  isRequirementsMet() {
    return this.requirementsMet;
  }

  getRequirementsNotMetInfo() {
    return this.requirementsNotMetInfo;
  }

  getRequirementsNotMetDetails() {
    return this.requirementsNotMetDetails;
  }
}

module.exports = IdentityProfileReportSchemesComplianceResponse;
