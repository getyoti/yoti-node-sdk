export = AdvancedIdentityProfile;
declare class AdvancedIdentityProfile {
    /**
     * @param {string} trustFramework
     * @param {AdvancedIdentityProfileScheme[]} schemes
     */
    constructor(trustFramework: string, schemes: AdvancedIdentityProfileScheme[]);
    trustFramework: string;
    schemes: AdvancedIdentityProfileScheme[];
    toJSON(): {
        trust_framework: string;
        schemes: AdvancedIdentityProfileScheme[];
    };
}
import AdvancedIdentityProfileScheme = require("./advanced.identity.profile.scheme");
