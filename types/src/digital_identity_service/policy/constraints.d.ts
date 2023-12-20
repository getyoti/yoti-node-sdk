export = Constraints;
declare class Constraints {
    /**
     * Set default properties.
     */
    constructor(constraints: any);
    constraints: any;
    /**
     * @returns {Array} for JSON.stringify()
     */
    toJSON(): any[];
}
