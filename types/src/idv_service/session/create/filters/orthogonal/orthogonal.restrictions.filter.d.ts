export = OrthogonalRestrictionsFilter;
declare class OrthogonalRestrictionsFilter extends DocumentFilter {
    /**
     * @param {CountryRestriction} countryRestriction
     * @param {TypeRestriction} typeRestriction
     * @param {Boolean} allowExpiredDocuments
     * @param {Boolean} allowNonLatinDocuments
     */
    constructor(countryRestriction: CountryRestriction, typeRestriction: TypeRestriction, allowExpiredDocuments: boolean, allowNonLatinDocuments: boolean);
    /** @private */
    private countryRestriction;
    /** @private */
    private typeRestriction;
    /** @private */
    private allowExpiredDocuments;
    /** @private */
    private allowNonLatinDocuments;
}
import DocumentFilter = require("../document.filter");
import CountryRestriction = require("./country.restriction");
import TypeRestriction = require("./type.restriction");
