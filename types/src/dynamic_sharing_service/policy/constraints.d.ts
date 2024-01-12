export = Constraints;
/**
 * List of constraints to apply to a wanted attribute.
 *
 * @class Constraints
 */
declare class Constraints {
    /**
     * Set default properties.
     */
    constructor(constraints: any);
    /** @private */
    private constraints;
    /**
     * @returns {Array} for JSON.stringify()
     */
    toJSON(): any[];
}
