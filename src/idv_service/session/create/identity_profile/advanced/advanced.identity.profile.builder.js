'use strict';

const Validation = require('../../../../../yoti_common/validation');
const AdvancedIdentityProfileScheme = require('./advanced.identity.profile.scheme');
const AdvancedIdentityProfile = require('./advanced.identity.profile');

class AdvancedIdentityProfileBuilder {
  constructor() {
    /** @private {AdvancedIdentityProfileScheme[]} */
    this.schemes = [];
  }

  /**
   * @param {string} trustFramework
   * @returns {AdvancedIdentityProfileBuilder}
   */
  withTrustFramework(trustFramework) {
    Validation.isString(trustFramework, 'trustFramework');
    /** @private {string} */
    this.trustFramework = trustFramework;
    return this;
  }

  /**
   * @param {AdvancedIdentityProfileScheme} scheme
   * @returns {AdvancedIdentityProfileBuilder}
   */
  withScheme(scheme) {
    Validation.instanceOf(scheme, AdvancedIdentityProfileScheme, 'scheme');
    this.schemes.push(scheme);
    return this;
  }

  /**
   * @returns {AdvancedIdentityProfile}
   */
  build() {
    return new AdvancedIdentityProfile(this.trustFramework, this.schemes);
  }
}

module.exports = AdvancedIdentityProfileBuilder;
