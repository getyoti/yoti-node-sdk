export = DynamicPolicyBuilder;
declare class DynamicPolicyBuilder {
    /** @private */
    private wantedAttributes;
    /** @private */
    private wantedAuthTypes;
    /**
     * @param {WantedAttribute} wantedAttribute
     */
    withWantedAttribute(wantedAttribute: WantedAttribute): this;
    /**
     * @param {string} name
     * @param {Constraints} constraints
     * @param {boolean|null} acceptSelfAsserted
     */
    withWantedAttributeByName(name: string, constraints?: Constraints, acceptSelfAsserted?: boolean | null): this;
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
    withWantedRememberMe(wantedRememberMe: boolean): this;
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
     * @returns {DynamicPolicy}
     */
    build(): DynamicPolicy;
}
declare namespace DynamicPolicyBuilder {
    export { Constraints };
}
import WantedAttribute = require("./wanted.attribute");
import DynamicPolicy = require("./dynamic.policy");
type Constraints = import('./constraints');
