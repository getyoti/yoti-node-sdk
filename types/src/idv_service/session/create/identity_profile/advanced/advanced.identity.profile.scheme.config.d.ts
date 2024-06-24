export = AdvancedIdentityProfileSchemeConfig;
declare class AdvancedIdentityProfileSchemeConfig {
    /**
     * @param {DocumentFilter} filter
     */
    constructor(filter: DocumentFilter);
    filter: DocumentFilter;
    toJSON(): {
        filter: DocumentFilter;
    };
}
import DocumentFilter = require("../../filters/document.filter");
