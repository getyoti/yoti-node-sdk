export = WantedAttribute;
declare class WantedAttribute {
    /**
     * @param {string} name
     * @param {string|null} derivation
     * @param {boolean|null} acceptSelfAsserted
     * @param {Constraints|null} constraints
     */
    constructor(name: string, derivation?: string | null, acceptSelfAsserted?: boolean | null, constraints?: Constraints | null);
    /** @private */
    private name;
    /** @private */
    private derivation;
    /** @private */
    private acceptSelfAsserted;
    /** @private */
    private constraints;
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
