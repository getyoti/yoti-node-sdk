export = OrthogonalRestrictionsFilter;
/**
 * @typedef {import('./../allowed.provider')} AllowedProvider
 */
declare class OrthogonalRestrictionsFilter extends DocumentFilter {
    /**
     * @param {CountryRestriction} countryRestriction
     * @param {TypeRestriction} typeRestriction
     * @param {Boolean} allowExpiredDocuments
     * @param {Boolean} allowNonLatinDocuments
     * @param {boolean} allowDigitalIds
     * @param {AllowedProvider[]} allowedProviders
     */
    constructor(countryRestriction: CountryRestriction, typeRestriction: TypeRestriction, allowExpiredDocuments: boolean, allowNonLatinDocuments: boolean, allowDigitalIds: boolean, allowedProviders: AllowedProvider[]);
    /** @private */
    private countryRestriction;
    /** @private */
    private typeRestriction;
}
declare namespace OrthogonalRestrictionsFilter {
    export { AllowedProvider };
}
import DocumentFilter = require("../document.filter");
import CountryRestriction = require("./country.restriction");
import TypeRestriction = require("./type.restriction");
type AllowedProvider = import('./../allowed.provider');
