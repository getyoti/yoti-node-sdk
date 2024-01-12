export = CountryRestriction;
declare class CountryRestriction {
    /**
     * @param {string} inclusion
     * @param {string[]} countryCodes
     */
    constructor(inclusion: string, countryCodes: string[]);
    /** @private */
    private inclusion;
    /** @private */
    private countryCodes;
    toJSON(): {
        inclusion: string;
        country_codes: string[];
    };
}
