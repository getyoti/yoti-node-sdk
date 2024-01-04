export = PolicyBuilder;
declare class PolicyBuilder {
    wantedAttributes: {};
    wantedAuthTypes: any[];
    /**
     * @param {WantedAttribute} wantedAttribute
     */
    withWantedAttribute(wantedAttribute: WantedAttribute): this;
    /**
     * @param {string} name
     * @param {Constraints} constraints
     * @param {boolean} acceptSelfAsserted
     */
    withWantedAttributeByName(name: string, constraints?: Constraints, acceptSelfAsserted?: boolean): this;
    /**
     * @param {Constraints} constraints
     * @param {boolean} acceptSelfAsserted
     */
    withFamilyName(constraints?: Constraints, acceptSelfAsserted?: boolean): this;
    /**
     * @param {Constraints} constraints
     * @param {boolean} acceptSelfAsserted
     */
    withGivenNames(constraints?: Constraints, acceptSelfAsserted?: boolean): this;
    /**
     * @param {Constraints} constraints
     * @param {boolean} acceptSelfAsserted
     */
    withFullName(constraints?: Constraints, acceptSelfAsserted?: boolean): this;
    /**
     * @param {Constraints} constraints
     * @param {boolean} acceptSelfAsserted
     */
    withDateOfBirth(constraints?: Constraints, acceptSelfAsserted?: boolean): this;
    /**
     * @param {number} age
     * @param {Constraints} constraints
     * @param {boolean} acceptSelfAsserted
     */
    withAgeOver(age: number, constraints?: Constraints, acceptSelfAsserted?: boolean): this;
    /**
     * @param {number} age
     * @param {Constraints} constraints
     * @param {boolean} acceptSelfAsserted
     */
    withAgeUnder(age: number, constraints?: Constraints, acceptSelfAsserted?: boolean): this;
    /**
     * @param {string} derivation
     * @param {Constraints} constraints
     * @param {boolean} acceptSelfAsserted
     */
    withAgeDerivedAttribute(derivation: string, constraints?: Constraints, acceptSelfAsserted?: boolean): this;
    /**
     * @param {Constraints} constraints
     * @param {boolean} acceptSelfAsserted
     */
    withGender(constraints?: Constraints, acceptSelfAsserted?: boolean): this;
    /**
     * @param {Constraints} constraints
     * @param {boolean} acceptSelfAsserted
     */
    withPostalAddress(constraints?: Constraints, acceptSelfAsserted?: boolean): this;
    /**
     * @param {Constraints} constraints
     * @param {boolean} acceptSelfAsserted
     */
    withStructuredPostalAddress(constraints?: Constraints, acceptSelfAsserted?: boolean): this;
    /**
     * @param {Constraints} constraints
     * @param {boolean} acceptSelfAsserted
     */
    withNationality(constraints?: Constraints, acceptSelfAsserted?: boolean): this;
    /**
     * @param {Constraints} constraints
     * @param {boolean} acceptSelfAsserted
     */
    withPhoneNumber(constraints?: Constraints, acceptSelfAsserted?: boolean): this;
    /**
     * @param {Constraints} constraints
     * @param {boolean} acceptSelfAsserted
     */
    withSelfie(constraints?: Constraints, acceptSelfAsserted?: boolean): this;
    /**
     * @param {Constraints} constraints
     * @param {boolean} acceptSelfAsserted
     */
    withDocumentDetails(constraints?: Constraints, acceptSelfAsserted?: boolean): this;
    /**
     * @param {Constraints} constraints
     * @param {boolean} acceptSelfAsserted
     */
    withDocumentImages(constraints?: Constraints, acceptSelfAsserted?: boolean): this;
    /**
     * @param {Constraints} constraints
     * @param {boolean} acceptSelfAsserted
     */
    withEmail(constraints?: Constraints, acceptSelfAsserted?: boolean): this;
    /**
     * @param {boolean} enabled
     */
    withSelfieAuthentication(enabled?: boolean): this;
    /**
     * @param {boolean} enabled
     */
    withPinAuthentication(enabled?: boolean): this;
    /**
     * @param {number} wantedAuthType
     * @param {boolean} enabled
     */
    withWantedAuthType(wantedAuthType: number, enabled?: boolean): this;
    /**
     * @param {boolean} wantedRememberMe
     */
    withWantedRememberMe(wantedRememberMe?: boolean): this;
    wantedRememberMe: boolean;
    /**
     * @param {object} identityProfileRequirements
     */
    withIdentityProfileRequirements(identityProfileRequirements: object): this;
    identityProfileRequirements: any;
    /**
     * @returns {Policy}
     */
    build(): Policy;
}
import WantedAttribute = require("./wanted.attribute");
import Policy = require("./policy");
