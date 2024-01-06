export = Objective;
declare class Objective {
    /**
     * @param {string} type
     */
    constructor(type: string);
    /** @private */
    private type;
    toJSON(): {
        type: string;
    };
}
