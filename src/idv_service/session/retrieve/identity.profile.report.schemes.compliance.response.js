'use strict';

const Validation = require('../../../yoti_common/validation');
const IdentityProfileSchemeResponse = require('./identity.profile.scheme.response');

class IdentityProfileReportSchemesComplianceResponse {
  constructor(schemesCompliance) {
    Validation.isPlainObject(schemesCompliance.scheme, 'scheme');
    /** @private @type {IdentityProfileSchemeResponse} */
    this.scheme = new IdentityProfileSchemeResponse(schemesCompliance.scheme);

    Validation.isBoolean(schemesCompliance.requirements_met, 'requirements_met');
    /** @private @type {boolean} */
    this.requirementsMet = schemesCompliance.requirements_met;

    Validation.isString(schemesCompliance.requirements_not_met_info, 'requirements_not_met_info', true);
    /** @private @type {string|undefined} */
    this.requirementsNotMetInfo = schemesCompliance.requirements_not_met_info;
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
}

module.exports = IdentityProfileReportSchemesComplianceResponse;
