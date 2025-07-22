/**
 * Based on an 'Age Verify/Condition' attribute name and value, provides behaviour specific
 * to verifying someone's age.
 *
 * @class AgeVerification
 */
export class AgeVerification {
    static isAttributeNameMatchingAgeVerification(name: any): any;
    constructor(name: any, value: any);
    /** @private */
    private checkType;
    /** @private */
    private age;
    /** @private */
    private ageBuffer;
    /** @private */
    private result;
    /**
     * The type of age check performed, as specified on Yoti Hub.
     *
     * Among the possible values are 'age_over' and 'age_under'.
     *
     * @returns {string}
     */
    getCheckType(): string;
    /**
     * The age that was that checked, as specified on Yoti Hub.
     *
     * @returns {number}
     */
    getAge(): number;
    /**
     * The age buffer allowed
     *
     * @returns {number|undefined}
     */
    getAgeBuffer(): number | undefined;
    /**
     * Whether the profile passed the age check.
     *
     * @returns {boolean}
     */
    getResult(): boolean;
}
