/**
 * Wraps an 'Age Verify/Condition' attribute to provide behaviour specific
 * to verifying someone's age.
 *
 * @class AgeVerification
 */
export class AgeVerification {
    constructor(attribute: any);
    attribute: any;
    checkType: any;
    age: number;
    result: boolean;
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
     * @returns {integer}
     */
    getAge(): any;
    /**
     * Whether or not the profile passed the age check.
     *
     * @returns {boolean}
     */
    getResult(): boolean;
    /**
     * The wrapped profile attribute.
     *
     * Use this if you need access to the underlying List of Anchors.
     *
     * @returns {Attribute}
     */
    getAttribute(): any;
}
