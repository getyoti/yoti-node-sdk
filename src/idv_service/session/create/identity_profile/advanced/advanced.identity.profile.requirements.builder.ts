import Validation = require('../../../../../yoti_common/validation');
import AdvancedIdentityProfile = require('./advanced.identity.profile');
import AdvancedIdentityProfileRequirements = require('./advanced.identity.profile.requirements');

class AdvancedIdentityProfileRequirementsBuilder {
  constructor() {
    /** @private {AdvancedIdentityProfile[]} */
    this.profiles = [];
  }

  /**
   * @param {AdvancedIdentityProfile} profile
   * @returns {AdvancedIdentityProfileRequirementsBuilder}
   */
  withProfile(profile) {
    Validation.instanceOf(profile, AdvancedIdentityProfile, 'profile');
    this.profiles.push(profile);
    return this;
  }

  /**
   * @returns {AdvancedIdentityProfileRequirements}
   */
  build() {
    return new AdvancedIdentityProfileRequirements(this.profiles);
  }
}

export default AdvancedIdentityProfileRequirementsBuilder;
