export = WantedAttributeBuilder;
declare class WantedAttributeBuilder {
    /**
     * @param {string} name
     */
    withName(name: string): this;
    name: string;
    /**
     * @param {string} derivation
     */
    withDerivation(derivation: string): this;
    derivation: string;
    /**
     * @param {Constraints} constraints
     */
    withConstraints(constraints: Constraints): this;
    constraints: Constraints;
    /**
     * @param {boolean} acceptSelfAsserted
     */
    withAcceptSelfAsserted(acceptSelfAsserted?: boolean): this;
    acceptSelfAsserted: boolean;
    /**
     * @returns {WantedAttribute}
     */
    build(): WantedAttribute;
}
import WantedAttribute = require("./wanted.attribute");
