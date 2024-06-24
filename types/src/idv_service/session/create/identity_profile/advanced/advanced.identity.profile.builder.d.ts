export = AdvancedIdentityProfileBuilder;
declare class AdvancedIdentityProfileBuilder {
    /** @private {AdvancedIdentityProfileScheme[]} */
    private schemes;
    /**
     * @param {string} trustFramework
     * @returns {AdvancedIdentityProfileBuilder}
     */
    withTrustFramework(trustFramework: string): AdvancedIdentityProfileBuilder;
    /** @private {string} */
    private trustFramework;
    /**
     * @param {AdvancedIdentityProfileScheme} scheme
     * @returns {AdvancedIdentityProfileBuilder}
     */
    withScheme(scheme: AdvancedIdentityProfileScheme): AdvancedIdentityProfileBuilder;
    /**
     * @returns {AdvancedIdentityProfile}
     */
    build(): AdvancedIdentityProfile;
}
import AdvancedIdentityProfileScheme = require("./advanced.identity.profile.scheme");
import AdvancedIdentityProfile = require("./advanced.identity.profile");
