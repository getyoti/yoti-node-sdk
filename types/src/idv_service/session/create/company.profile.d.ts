export = CompanyProfile;
declare class CompanyProfile {
    /**
     * @param {string} companyName
     *   The company name
     */
    constructor(companyName: string);
    /** @private */
    private companyName;
    /**
     * Returns serialized data for JSON.stringify()
     */
    toJSON(): {
        company_name: string;
    };
}
