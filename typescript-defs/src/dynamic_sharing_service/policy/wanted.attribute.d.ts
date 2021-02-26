export = WantedAttribute;
declare class WantedAttribute {
    /**
     * @param {string} name
     * @param {string} derivation
     * @param {boolean} acceptSelfAsserted
     * @param {Constraints} constraints
     */
    constructor(name: string, derivation?: string, acceptSelfAsserted?: boolean, constraints?: Constraints);
    name: string;
    derivation: string;
    acceptSelfAsserted: boolean;
    constraints: Constraints;
    /**
     * Name identifying the WantedAttribute
     *
     * @returns {string}
     */
    getName(): string;
    /**
     * Additional derived criteria.
     *
     * @returns {string}
     */
    getDerivation(): string;
    /**
     * List of constraints to add to an attribute.
     *
     * If you do not provide any particular constraints, Yoti will provide you with the
     * information from the most recently added source.
     *
     * @returns {Constraints}
     */
    getConstraints(): Constraints;
    /**
     * Accept self asserted attributes.
     *
     * These are attributes that have been self-declared, and not verified by Yoti.
     *
     * @returns {boolean}
     */
    getAcceptSelfAsserted(): boolean;
    /**
     * @returns {Object} data for JSON.stringify()
     */
    toJSON(): any;
}
import Constraints = require("./constraints");
