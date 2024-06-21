'use strict';

const Validation = require('../../../../../yoti_common/validation');
const AdvancedIdentityProfileScheme = require('./advanced.identity.profile.scheme');

class AdvancedIdentityProfile {
  /**
   * @param {string} trustFramework
   * @param {AdvancedIdentityProfileScheme[]} schemes
   */
  constructor(trustFramework, schemes) {
    Validation.isString(trustFramework, 'trustFramework');
    /** @private {string} */
    this.trustFramework = trustFramework;
    Validation.isArrayOfType(schemes, AdvancedIdentityProfileScheme, 'schemes');
    /** @private {AdvancedIdentityProfileScheme[]} */
    this.schemes = schemes;
  }

  toJSON() {
    return {
      trust_framework: this.trustFramework,
      schemes: this.schemes,
    };
  }
}

module.exports = AdvancedIdentityProfile;
