export = Constraints;
declare class Constraints {
    /**
     * Set default properties.
     */
    constructor(constraints: any);
    /** @private */
    private constraints;
    /**
     * Returns serialized data for JSON.stringify()
     */
    toJSON(): any;
}
