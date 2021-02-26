export = CountryRestriction;
declare class CountryRestriction {
    /**
     * @param {string} inclusion
     * @param {string[]} countryCodes
     */
    constructor(inclusion: string, countryCodes: string[]);
    inclusion: string;
    countryCodes: string[];
    toJSON(): {
        inclusion: string;
        country_codes: string[];
    };
}
