export = WantedAttributeBuilder;
declare class WantedAttributeBuilder {
    /**
     * @param {string} name
     */
    withName(name: string): import("./wanted.attribute.builder");
    name: string;
    /**
     * @param {string} derivation
     */
    withDerivation(derivation: string): import("./wanted.attribute.builder");
    derivation: string;
    /**
     * @param {Constraints} constraints
     */
    withConstraints(constraints: any): import("./wanted.attribute.builder");
    constraints: any;
    /**
     * @param {Array} acceptSelfAsserted
     */
    withAcceptSelfAsserted(acceptSelfAsserted?: any[]): import("./wanted.attribute.builder");
    acceptSelfAsserted: any[];
    /**
     * @returns {WantedAttribute}
     */
    build(): WantedAttribute;
}
import WantedAttribute = require("./wanted.attribute");
