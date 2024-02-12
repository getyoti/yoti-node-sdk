export = PolicyBuilder;
declare class PolicyBuilder {
    /** @private */
    private wantedAttributes;
    /** @private */
    private wantedAuthTypes;
    /**
     * @param {WantedAttribute} wantedAttribute
     * @returns this
     */
    withWantedAttribute(wantedAttribute: WantedAttribute): this;
    /**
     * @param {string} name
     * @param {Constraints} [constraints]
     * @param {boolean} [acceptSelfAsserted]
     * @returns this
     */
    withWantedAttributeByName(name: string, constraints?: Constraints, acceptSelfAsserted?: boolean): this;
    /**
     * @param {Constraints} [constraints]
     * @param {boolean} [acceptSelfAsserted]
     * @returns this
     */
    withFamilyName(constraints?: Constraints, acceptSelfAsserted?: boolean): this;
    /**
     * @param {Constraints} [constraints]
     * @param {boolean} [acceptSelfAsserted]
     * @returns this
     */
    withGivenNames(constraints?: Constraints, acceptSelfAsserted?: boolean): this;
    /**
     * @param {Constraints} [constraints]
     * @param {boolean} [acceptSelfAsserted]
     * @returns this
     */
    withFullName(constraints?: Constraints, acceptSelfAsserted?: boolean): this;
    /**
     * @param {Constraints} [constraints]
     * @param {boolean} [acceptSelfAsserted]
     * @returns this
     */
    withDateOfBirth(constraints?: Constraints, acceptSelfAsserted?: boolean): this;
    /**
     * @param {number} age
     * @param {Constraints} [constraints]
     * @param {boolean} [acceptSelfAsserted]
     * @returns this
     */
    withAgeOver(age: number, constraints?: Constraints, acceptSelfAsserted?: boolean): this;
    /**
     * @param {number} age
     * @param {Constraints} [constraints]
     * @param {boolean} [acceptSelfAsserted]
     * @returns this
     */
    withAgeUnder(age: number, constraints?: Constraints, acceptSelfAsserted?: boolean): this;
    /**
     * @param {string} derivation
     * @param {Constraints} [constraints]
     * @param {boolean} [acceptSelfAsserted]
     * @returns this
     */
    withAgeDerivedAttribute(derivation: string, constraints?: Constraints, acceptSelfAsserted?: boolean): this;
    /**
     * @param {Constraints} [constraints]
     * @param {boolean} [acceptSelfAsserted]
     * @returns this
     */
    withGender(constraints?: Constraints, acceptSelfAsserted?: boolean): this;
    /**
     * @param {Constraints} [constraints]
     * @param {boolean} [acceptSelfAsserted]
     * @returns this
     */
    withPostalAddress(constraints?: Constraints, acceptSelfAsserted?: boolean): this;
    /**
     * @param {Constraints} [constraints]
     * @param {boolean} [acceptSelfAsserted]
     * @returns this
     */
    withStructuredPostalAddress(constraints?: Constraints, acceptSelfAsserted?: boolean): this;
    /**
     * @param {Constraints} [constraints]
     * @param {boolean} [acceptSelfAsserted]
     * @returns this
     */
    withNationality(constraints?: Constraints, acceptSelfAsserted?: boolean): this;
    /**
     * @param {Constraints} [constraints]
     * @param {boolean} [acceptSelfAsserted]
     * @returns this
     */
    withPhoneNumber(constraints?: Constraints, acceptSelfAsserted?: boolean): this;
    /**
     * @param {Constraints} [constraints]
     * @param {boolean} [acceptSelfAsserted]
     * @returns this
     */
    withSelfie(constraints?: Constraints, acceptSelfAsserted?: boolean): this;
    /**
     * @param {Constraints} [constraints]
     * @param {boolean} [acceptSelfAsserted]
     * @returns this
     */
    withDocumentDetails(constraints?: Constraints, acceptSelfAsserted?: boolean): this;
    /**
     * @param {Constraints} [constraints]
     * @param {boolean} [acceptSelfAsserted]
     * @returns this
     */
    withDocumentImages(constraints?: Constraints, acceptSelfAsserted?: boolean): this;
    /**
     * @param {Constraints} [constraints]
     * @param {boolean} [acceptSelfAsserted]
     * @returns this
     */
    withEmail(constraints?: Constraints, acceptSelfAsserted?: boolean): this;
    /**
     * @param {boolean} [enabled=true]
     * @returns this
     */
    withSelfieAuthentication(enabled?: boolean): this;
    /**
     * @param {boolean} [enabled=true]
     * @returns this
     */
    withPinAuthentication(enabled?: boolean): this;
    /**
     * @param {number} wantedAuthType
     * @param {boolean} [enabled=true]
     * @returns this
     */
    withWantedAuthType(wantedAuthType: number, enabled?: boolean): this;
    /**
     * @param {boolean} [wantedRememberMe=true]
     * @returns this
     */
    withWantedRememberMe(wantedRememberMe?: boolean): this;
    wantedRememberMe: boolean;
    /**
     * @typedef {Object} SimpleScheme
     * @property {string} type
     * @property {string} [objective]
     *
     * @param {Object} identityProfileRequirements
     * @param {string} identityProfileRequirements.trust_framework
     * @param {SimpleScheme} identityProfileRequirements.scheme
     */
    withIdentityProfileRequirements(identityProfileRequirements: {
        trust_framework: string;
        scheme: {
            type: string;
            objective?: string;
        };
    }): this;
    identityProfileRequirements: {
        trust_framework: string;
        scheme: {
            type: string;
            objective?: string;
        };
    };
    /**
     * @typedef {Object} AdvancedScheme
     * @property {string} type
     * @property {string} objective
     * @property {string} label
     *
     * @typedef {Object} AdvancedProfileRequirements
     * @property {string} trust_framework - Expected: 'UK_TFIDA' | 'YOTI_GLOBAL'
     * @property {Array<AdvancedScheme>} schemes
     *
     * @param {Object} advancedIdentityProfileRequirements
     * @param {Array<AdvancedProfileRequirements>} advancedIdentityProfileRequirements.profiles
     */
    withAdvancedIdentityProfileRequirements(advancedIdentityProfileRequirements: {
        profiles: {
            /**
             * - Expected: 'UK_TFIDA' | 'YOTI_GLOBAL'
             */
            trust_framework: string;
            schemes: {
                type: string;
                objective: string;
                label: string;
            }[];
        }[];
    }): this;
    advancedIdentityProfileRequirements: {
        profiles: {
            /**
             * - Expected: 'UK_TFIDA' | 'YOTI_GLOBAL'
             */
            trust_framework: string;
            schemes: {
                type: string;
                objective: string;
                label: string;
            }[];
        }[];
    };
    /**
     * @returns {Policy}
     */
    build(): Policy;
}
declare namespace PolicyBuilder {
    export { Constraints };
}
import WantedAttribute = require("./wanted.attribute");
import Policy = require("./policy");
type Constraints = import('./constraints');
