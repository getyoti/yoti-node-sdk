export = DynamicPolicyBuilder;
declare class DynamicPolicyBuilder {
    wantedAttributes: {};
    wantedAuthTypes: any[];
    /**
     * @param {WantedAttribute} wantedAttribute
     */
    withWantedAttribute(wantedAttribute: WantedAttribute): import("./dynamic.policy.builder");
    /**
     * @param {string} name
     * @param {Constraints} constraints
     * @param {boolean} acceptSelfAsserted
     */
    withWantedAttributeByName(name: string, constraints?: any, acceptSelfAsserted?: boolean): import("./dynamic.policy.builder");
    /**
     * @param {Constraints} constraints
     * @param {boolean} acceptSelfAsserted
     */
    withFamilyName(constraints?: any, acceptSelfAsserted?: boolean): import("./dynamic.policy.builder");
    /**
     * @param {Constraints} constraints
     * @param {boolean} acceptSelfAsserted
     */
    withGivenNames(constraints?: any, acceptSelfAsserted?: boolean): import("./dynamic.policy.builder");
    /**
     * @param {Constraints} constraints
     * @param {boolean} acceptSelfAsserted
     */
    withFullName(constraints?: any, acceptSelfAsserted?: boolean): import("./dynamic.policy.builder");
    /**
     * @param {Constraints} constraints
     * @param {boolean} acceptSelfAsserted
     */
    withDateOfBirth(constraints?: any, acceptSelfAsserted?: boolean): import("./dynamic.policy.builder");
    /**
     * @param {int} age
     * @param {Constraints} constraints
     * @param {boolean} acceptSelfAsserted
     */
    withAgeOver(age: any, constraints?: any, acceptSelfAsserted?: boolean): import("./dynamic.policy.builder");
    /**
     * @param {int} age
     * @param {Constraints} constraints
     * @param {boolean} acceptSelfAsserted
     */
    withAgeUnder(age: any, constraints?: any, acceptSelfAsserted?: boolean): import("./dynamic.policy.builder");
    /**
     * @param {string} derivation
     * @param {Constraints} constraints
     * @param {boolean} acceptSelfAsserted
     */
    withAgeDerivedAttribute(derivation: string, constraints?: any, acceptSelfAsserted?: boolean): import("./dynamic.policy.builder");
    /**
     * @param {Constraints} constraints
     * @param {boolean} acceptSelfAsserted
     */
    withGender(constraints?: any, acceptSelfAsserted?: boolean): import("./dynamic.policy.builder");
    /**
     * @param {Constraints} constraints
     * @param {boolean} acceptSelfAsserted
     */
    withPostalAddress(constraints?: any, acceptSelfAsserted?: boolean): import("./dynamic.policy.builder");
    /**
     * @param {Constraints} constraints
     * @param {boolean} acceptSelfAsserted
     */
    withStructuredPostalAddress(constraints?: any, acceptSelfAsserted?: boolean): import("./dynamic.policy.builder");
    /**
     * @param {Constraints} constraints
     * @param {boolean} acceptSelfAsserted
     */
    withNationality(constraints?: any, acceptSelfAsserted?: boolean): import("./dynamic.policy.builder");
    /**
     * @param {Constraints} constraints
     * @param {boolean} acceptSelfAsserted
     */
    withPhoneNumber(constraints?: any, acceptSelfAsserted?: boolean): import("./dynamic.policy.builder");
    /**
     * @param {Constraints} constraints
     * @param {boolean} acceptSelfAsserted
     */
    withSelfie(constraints?: any, acceptSelfAsserted?: boolean): import("./dynamic.policy.builder");
    /**
     * @param {Constraints} constraints
     * @param {boolean} acceptSelfAsserted
     */
    withDocumentDetails(constraints?: any, acceptSelfAsserted?: boolean): import("./dynamic.policy.builder");
    /**
     * @param {Constraints} constraints
     * @param {boolean} acceptSelfAsserted
     */
    withDocumentImages(constraints?: any, acceptSelfAsserted?: boolean): import("./dynamic.policy.builder");
    /**
     * @param {Constraints} constraints
     * @param {boolean} acceptSelfAsserted
     */
    withEmail(constraints?: any, acceptSelfAsserted?: boolean): import("./dynamic.policy.builder");
    /**
     * @param {boolean} enabled
     */
    withSelfieAuthentication(enabled?: boolean): import("./dynamic.policy.builder");
    /**
     * @param {boolean} enabled
     */
    withPinAuthentication(enabled?: boolean): import("./dynamic.policy.builder");
    /**
     * @param {integer} wantedAuthType
     * @param {boolean} enabled
     */
    withWantedAuthType(wantedAuthType: any, enabled?: boolean): import("./dynamic.policy.builder");
    /**
     * @param {boolean} wantedRememberMe
     */
    withWantedRememberMe(wantedRememberMe: boolean): import("./dynamic.policy.builder");
    wantedRememberMe: boolean;
    /**
     * @returns {DynamicPolicy}
     */
    build(): DynamicPolicy;
}
import WantedAttribute = require("./wanted.attribute");
import DynamicPolicy = require("./dynamic.policy");
