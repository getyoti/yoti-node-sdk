export = OrthogonalRestrictionsFilterBuilder;
declare class OrthogonalRestrictionsFilterBuilder {
    /**
     * @param {string[]} countryCodes
     *
     * @returns {this}
     */
    withWhitelistedCountries(countryCodes: string[]): this;
    countryRestriction: CountryRestriction;
    /**
     * @param {string[]} countryCodes
     *
     * @returns {this}
     */
    withBlacklistedCountries(countryCodes: string[]): this;
    /**
     * @param {string[]} documentTypes
     *
     * @returns {this}
     */
    withWhitelistedDocumentTypes(documentTypes: string[]): this;
    typeRestriction: TypeRestriction;
    /**
     * @param {string[]} documentTypes
     *
     * @returns {this}
     */
    withBlacklistedDocumentTypes(documentTypes: string[]): this;
    /**
     * @param {Boolean} allowExpiredDocuments
     *
     * @returns {this}
     */
    withAllowExpiredDocuments(allowExpiredDocuments: boolean): this;
    allowExpiredDocuments: boolean;
    /**
     * @param {Boolean} allowNonLatinDocuments
     *
     * @returns {this}
     */
    withAllowNonLatinDocuments(allowNonLatinDocuments: boolean): this;
    allowNonLatinDocuments: boolean;
    /**
     * @returns {OrthogonalRestrictionsFilter}
     */
    build(): OrthogonalRestrictionsFilter;
}
import CountryRestriction = require("./country.restriction");
import TypeRestriction = require("./type.restriction");
import OrthogonalRestrictionsFilter = require("./orthogonal.restrictions.filter");
