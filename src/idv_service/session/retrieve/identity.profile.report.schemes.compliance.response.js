'use strict';

const Validation = require('../../../yoti_common/validation');

class IdentityProfileReportSchemesComplianceResponse {
  constructor(schemesCompliance) {
    Validation.isPlainObject(schemesCompliance.scheme, 'scheme');
    this.scheme = schemesCompliance.scheme;

    Validation.isBoolean(schemesCompliance.requirements_met, 'requirements_met');
    this.requirementsMet = schemesCompliance.requirements_met;

    if (schemesCompliance.requirements_not_met_info) {
      Validation.isString(schemesCompliance.requirements_not_met_info, 'requirements_not_met_info');
      this.requirementsNotMetInfo = schemesCompliance.requirements_not_met_info;
    }
  }

  /**
   * @returns {object}
   */
  getScheme() {
    return this.scheme;
  }

  /**
   * @returns {boolean}
   */
  isRequirementsMet() {
    return this.requirementsMet;
  }

  /**
   * @returns {string}
   */
  getRequirementsNotMetInfo() {
    return this.requirementsNotMetInfo;
  }
}

module.exports = IdentityProfileReportSchemesComplianceResponse;
