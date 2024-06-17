'use strict';

const Validation = require('../../../../../yoti_common/validation');
const AdvancedIdentityProfileSchemeResponse = require('./advanced.identity.profile.scheme.response');

class AdvancedIdentityProfileSchemeComplianceResponse {
  constructor(schemesCompliance) {
    Validation.isPlainObject(schemesCompliance.scheme, 'scheme');
    /** @private {AdvancedIdentityProfileSchemeResponse} */
    this.scheme = new AdvancedIdentityProfileSchemeResponse(schemesCompliance.scheme);

    Validation.isBoolean(schemesCompliance.requirements_met, 'requirements_met');
    /** @private {boolean} */
    this.requirementsMet = schemesCompliance.requirements_met;

    Validation.isString(schemesCompliance.requirements_not_met_info, 'requirements_not_met_info', true);
    /** @private {string|undefined} */
    this.requirementsNotMetInfo = schemesCompliance.requirements_not_met_info;
  }

  getScheme() {
    return this.scheme;
  }

  getRequirementsMet() {
    return this.requirementsMet;
  }

  getRequirementsNotMetInfo() {
    return this.requirementsNotMetInfo;
  }
}

module.exports = AdvancedIdentityProfileSchemeComplianceResponse;
