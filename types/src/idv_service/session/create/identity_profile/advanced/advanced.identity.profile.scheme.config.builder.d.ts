export = AdvancedIdentityProfileSchemeConfigBuilder;
declare class AdvancedIdentityProfileSchemeConfigBuilder {
    /**
     * @param {DocumentFilter} filter
     * @returns {AdvancedIdentityProfileSchemeConfigBuilder}
     */
    withFilter(filter: DocumentFilter): AdvancedIdentityProfileSchemeConfigBuilder;
    filter: DocumentFilter;
    /**
     * @returns {AdvancedIdentityProfileSchemeConfig}
     */
    build(): AdvancedIdentityProfileSchemeConfig;
}
import DocumentFilter = require("../../filters/document.filter");
import AdvancedIdentityProfileSchemeConfig = require("./advanced.identity.profile.scheme.config");
