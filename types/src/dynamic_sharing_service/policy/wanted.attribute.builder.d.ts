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
     * @typedef {import('./constraints')} Constraints
     *
     * @param {Constraints} constraints
     */
    withConstraints(constraints: import("./constraints")): this;
    constraints: import("./constraints");
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
