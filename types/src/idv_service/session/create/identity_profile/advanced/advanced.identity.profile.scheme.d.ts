export = AdvancedIdentityProfileScheme;
declare class AdvancedIdentityProfileScheme {
    /**
     * @param {string} type
     * @param {string} objective
     * @param {string} label
     * @param {AdvancedIdentityProfileSchemeConfig} [config]
     */
    constructor(type: string, objective: string, label: string, config?: AdvancedIdentityProfileSchemeConfig);
    type: string;
    objective: string;
    label: string;
    config: AdvancedIdentityProfileSchemeConfig;
    toJSON(): {
        type: string;
        objective: string;
        label: string;
        config: AdvancedIdentityProfileSchemeConfig;
    };
}
import AdvancedIdentityProfileSchemeConfig = require("./advanced.identity.profile.scheme.config");
