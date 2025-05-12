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
     * @param {string} alternativeName
     */
    withAlternativeName(alternativeName: string): this;
    alternativeNames: any;
    /**
     * @param {string[]} alternativeNames
     */
    withAlternativeNames(alternativeNames: string[]): this;
    /**
     * @param {boolean} [optional=true]
     */
    withOptional(optional?: boolean): this;
    optional: boolean;
    /**
     * @returns {WantedAttribute}
     */
    build(): WantedAttribute;
}
import WantedAttribute = require("./wanted.attribute");
