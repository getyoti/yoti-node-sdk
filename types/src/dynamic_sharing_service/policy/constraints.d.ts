export = Constraints;
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
