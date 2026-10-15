export = CompanyProfileBuilder;
/**
 * Builder to assist in the creation of {@link CompanyProfile}.
 *
 * @class CompanyProfileBuilder
 */
declare class CompanyProfileBuilder {
    /**
     * Sets the company name
     *
     * @param {string} companyName the company name
     *
     * @returns {this}
     */
    withCompanyName(companyName: string): this;
    companyName: string;
    /**
     * Builds the {@link CompanyProfile} using the values supplied to the builder
     *
     * @returns {CompanyProfile}
     */
    build(): CompanyProfile;
}
import CompanyProfile = require("./company.profile");
