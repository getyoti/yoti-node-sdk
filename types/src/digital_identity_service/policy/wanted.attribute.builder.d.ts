export = WantedAttributeBuilder;
declare class WantedAttributeBuilder {
    /**
     * @param {string} name
     * @returns this
     */
    withName(name: string): this;
    name: string;
    /**
     * @param {string} derivation
     * @returns this
     */
    withDerivation(derivation: string): this;
    derivation: string;
    /**
     * @typedef {import('./constraints')} Constraints
     * @param {Constraints} constraints
     * @returns this
     */
    withConstraints(constraints: import("./constraints")): this;
    constraints: import("./constraints");
    /**
     * @param {boolean} [acceptSelfAsserted=true]
     * @returns this
     */
    withAcceptSelfAsserted(acceptSelfAsserted?: boolean): this;
    acceptSelfAsserted: boolean;
    /**
     * @returns {WantedAttribute}
     */
    build(): WantedAttribute;
}
import WantedAttribute = require("./wanted.attribute");
