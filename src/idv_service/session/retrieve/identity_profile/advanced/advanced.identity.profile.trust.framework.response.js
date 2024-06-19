'use strict';

const Validation = require('../../../../../yoti_common/validation');
const AdvancedIdentityProfileSchemeComplianceResponse = require('./advanced.identity.profile.report.scheme.compliance.response');

class AdvancedIdentityProfileTrustFrameworkResponse {
  constructor(trustFrameworkCompliance) {
    Validation.isString(trustFrameworkCompliance.trust_framework, 'trust_framework');
    /** @private {string} */
    this.trustFramework = trustFrameworkCompliance.trust_framework;

    Validation.isArray(trustFrameworkCompliance.schemes_compliance, 'schemes_compliance');
    /** @private {AdvancedIdentityProfileSchemeComplianceResponse[]} */
    this.schemesCompliance = trustFrameworkCompliance.schemes_compliance
    // eslint-disable-next-line max-len
      .map((schemeCompliance) => new AdvancedIdentityProfileSchemeComplianceResponse(schemeCompliance));
  }

  getTrustFramework() {
    return this.trustFramework;
  }

  getSchemesCompliance() {
    return this.schemesCompliance;
  }
}

module.exports = AdvancedIdentityProfileTrustFrameworkResponse;
