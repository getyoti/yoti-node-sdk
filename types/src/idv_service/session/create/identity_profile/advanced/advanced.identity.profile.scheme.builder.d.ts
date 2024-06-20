export = AdvancedIdentityProfileSchemeBuilder;
declare class AdvancedIdentityProfileSchemeBuilder {
    /**
     * @param {string} type
     * @returns {AdvancedIdentityProfileSchemeBuilder}
     */
    withType(type: string): AdvancedIdentityProfileSchemeBuilder;
    type: string;
    /**
     * @param {string} objective
     * @returns {AdvancedIdentityProfileSchemeBuilder}
     */
    withObjective(objective: string): AdvancedIdentityProfileSchemeBuilder;
    objective: string;
    /**
     * @param {string} label
     * @returns {AdvancedIdentityProfileSchemeBuilder}
     */
    withLabel(label: string): AdvancedIdentityProfileSchemeBuilder;
    label: string;
    /**
     * @param {AdvancedIdentityProfileSchemeConfig} config
     * @returns {AdvancedIdentityProfileSchemeBuilder}
     */
    withConfig(config: AdvancedIdentityProfileSchemeConfig): AdvancedIdentityProfileSchemeBuilder;
    config: AdvancedIdentityProfileSchemeConfig;
    /**
     * @returns {AdvancedIdentityProfileScheme}
     */
    build(): AdvancedIdentityProfileScheme;
}
import AdvancedIdentityProfileSchemeConfig = require("./advanced.identity.profile.scheme.config");
import AdvancedIdentityProfileScheme = require("./advanced.identity.profile.scheme");
