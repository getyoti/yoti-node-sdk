export = AdvancedIdentityProfile;
declare class AdvancedIdentityProfile {
    /**
     * @param {string} trustFramework
     * @param {AdvancedIdentityProfileScheme[]} schemes
     */
    constructor(trustFramework: string, schemes: AdvancedIdentityProfileScheme[]);
    /** @private {string} */
    private trustFramework;
    /** @private {AdvancedIdentityProfileScheme[]} */
    private schemes;
    toJSON(): {
        trust_framework: string;
        schemes: AdvancedIdentityProfileScheme[];
    };
}
import AdvancedIdentityProfileScheme = require("./advanced.identity.profile.scheme");
