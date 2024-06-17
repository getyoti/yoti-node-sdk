'use strict';

const Validation = require('../../../../../yoti_common/validation');
const AdvancedIdentityProfile = require('./advanced.identity.profile');

class AdvancedIdentityProfileRequirements {
  /**
   * @param {AdvancedIdentityProfile[]} profiles
   */
  constructor(profiles) {
    Validation.isArrayOfType(profiles, AdvancedIdentityProfile, 'profiles');
    this.profiles = profiles;
  }
}

module.exports = AdvancedIdentityProfileRequirements;
