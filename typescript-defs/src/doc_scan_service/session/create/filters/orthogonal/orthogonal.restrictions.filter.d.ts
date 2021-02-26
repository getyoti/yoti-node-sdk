export = OrthogonalRestrictionsFilter;
declare class OrthogonalRestrictionsFilter extends DocumentFilter {
    /**
     * @param {CountryRestriction} countryRestriction
     * @param {TypeRestriction} typeRestriction
     */
    constructor(countryRestriction: CountryRestriction, typeRestriction: TypeRestriction);
    countryRestriction: CountryRestriction;
    typeRestriction: TypeRestriction;
}
import DocumentFilter = require("../document.filter");
import CountryRestriction = require("./country.restriction");
import TypeRestriction = require("./type.restriction");
