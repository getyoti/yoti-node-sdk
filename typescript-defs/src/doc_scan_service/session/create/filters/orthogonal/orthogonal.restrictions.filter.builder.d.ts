export = OrthogonalRestrictionsFilterBuilder;
declare class OrthogonalRestrictionsFilterBuilder {
    /**
     * @param {string[]} countryCodes
     */
    withWhitelistedCountries(countryCodes: string[]): OrthogonalRestrictionsFilterBuilder;
    countryRestriction: CountryRestriction;
    /**
     * @param {string[]} countryCodes
     */
    withBlacklistedCountries(countryCodes: string[]): OrthogonalRestrictionsFilterBuilder;
    /**
     * @param {string[]} documentTypes
     */
    withWhitelistedDocumentTypes(documentTypes: string[]): OrthogonalRestrictionsFilterBuilder;
    typeRestriction: TypeRestriction;
    /**
     * @param {string[]} documentTypes
     */
    withBlacklistedDocumentTypes(documentTypes: string[]): OrthogonalRestrictionsFilterBuilder;
    /**
     * @returns {OrthogonalRestrictionsFilter}
     */
    build(): OrthogonalRestrictionsFilter;
}
import CountryRestriction = require("./country.restriction");
import TypeRestriction = require("./type.restriction");
import OrthogonalRestrictionsFilter = require("./orthogonal.restrictions.filter");
