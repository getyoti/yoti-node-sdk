export class AmlAddress {
    constructor(countryCode: any, postcode: any);
    /**
     * @param countryCode
     */
    setCountryCode(countryCode: any): void;
    countryCode: any;
    /**
     * @returns country
     */
    getCountryCode(): any;
    /**
     * @param postcode
     */
    setPostcode(postcode: any): void;
    postcode: any;
    /**
     * @returns postcode
     */
    getPostcode(): any;
    /**
     * @returns {{}}
     */
    getData(): {};
    /**
     *
     * @deprecated Replaced by Validation.notNullOrEmpty()
     */
    validateCountryCode(): void;
    /**
     * Returns a string representing the object.
     *
     * @returns {string}
     */
    toString(): string;
}
