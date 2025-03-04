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
     * @param {string} alternativeName
     * @returns this
     */
    withAlternativeName(alternativeName: string): this;
    alternativeNames: any;
    /**
     * @param {string[]} alternativeNames
     * @returns this
     */
    withAlternativeNames(alternativeNames: string[]): this;
    /**
     * @param {boolean} [optional=true]
     * @returns this
     */
    withOptional(optional?: boolean): this;
    optional: boolean;
    /**
     * @returns {WantedAttribute}
     */
    build(): WantedAttribute;
}
import WantedAttribute = require("./wanted.attribute");
