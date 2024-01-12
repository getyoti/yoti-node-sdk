export class AmlProfile {
    /**
     * Check if amlAddress is an object.
     *
     * @param amlAddress
     */
    static validateAmlAddress(amlAddress: any): void;
    constructor(givenNames: any, familyName: any, amlAddress: any, ssn: any);
    /**
     * @param givenNames
     */
    setGivenNames(givenNames: any): void;
    givenNames: any;
    /**
     * @returns {*}
     */
    getGivenNames(): any;
    /**
     * @param familyName
     */
    setFamilyName(familyName: any): void;
    familyName: any;
    /**
     * @returns familyName
     */
    getFamilyName(): any;
    /**
     * @param amlAddress
     */
    setAmlAddress(amlAddress: any): void;
    amlAddress: any;
    /**
     * @returns amlAddress
     */
    getAmlAddress(): any;
    /**
     * @param ssn
     */
    setSsn(ssn: any): void;
    ssn: any;
    /**
     * @returns ssn
     */
    getSsn(): any;
    /**
     * Get profile data.
     *
     * @returns {{}}
     */
    getData(): {};
    /**
     * Returns a string representing the object.
     *
     * @returns {string}
     */
    toString(): string;
}
