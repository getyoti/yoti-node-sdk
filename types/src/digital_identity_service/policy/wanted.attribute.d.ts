export = WantedAttribute;
declare class WantedAttribute {
    /**
     * @param {string} name
     * @param {string|null} derivation
     * @param {boolean|null} acceptSelfAsserted
     * @param {Constraints|null} constraints
     * @param {string[]|null} alternativeNames
     * @param {boolean|null} optional
     */
    constructor(name: string, derivation?: string | null, acceptSelfAsserted?: boolean | null, constraints?: Constraints | null, alternativeNames?: string[] | null, optional?: boolean | null);
    /** @private */
    private name;
    /** @private */
    private derivation;
    /** @private */
    private acceptSelfAsserted;
    /** @private */
    private constraints;
    /** @private */
    private alternativeNames;
    /** @private */
    private optional;
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
     * Accept alternative names.
     *
     * These are names of attributes that can be used as fallback
     *
     * @returns {string[]}
     */
    getAlternativeNames(): string[];
    /**
     * Whether the attribute is wanted optionally
     *
     * @returns {boolean}
     */
    getOptional(): boolean;
    /**
     * Returns serialized data for JSON.stringify()
     */
    toJSON(): {
        name: string;
        optional: boolean;
    };
}
import Constraints = require("./constraints");
