import Validation = require('../../../../../yoti_common/validation');
import AdvancedIdentityProfile = require('./advanced.identity.profile');

class AdvancedIdentityProfileRequirements {
  /**
   * @param {AdvancedIdentityProfile[]} profiles
   */
  constructor(profiles) {
    Validation.isArrayOfType(profiles, AdvancedIdentityProfile, 'profiles');
    this.profiles = profiles;
  }
}

export default AdvancedIdentityProfileRequirements;
