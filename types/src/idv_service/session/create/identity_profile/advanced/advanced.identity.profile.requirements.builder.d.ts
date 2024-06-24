export = AdvancedIdentityProfileRequirementsBuilder;
declare class AdvancedIdentityProfileRequirementsBuilder {
    /** @private {AdvancedIdentityProfile[]} */
    private profiles;
    /**
     * @param {AdvancedIdentityProfile} profile
     * @returns {AdvancedIdentityProfileRequirementsBuilder}
     */
    withProfile(profile: AdvancedIdentityProfile): AdvancedIdentityProfileRequirementsBuilder;
    /**
     * @returns {AdvancedIdentityProfileRequirements}
     */
    build(): AdvancedIdentityProfileRequirements;
}
import AdvancedIdentityProfile = require("./advanced.identity.profile");
import AdvancedIdentityProfileRequirements = require("./advanced.identity.profile.requirements");
