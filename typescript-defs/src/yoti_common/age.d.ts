export class Age {
    static conditionVerified(attrName: any): boolean;
    constructor(profileData: any);
    profileData: any;
    attrValue: any;
    /**
     * Returns a boolean representing the attribute value
     * or null if the attribute is not set in the Yoti Hub
     *
     * @returns {*}
     */
    isVerified(): any;
    extractAgeValue(): void;
}
