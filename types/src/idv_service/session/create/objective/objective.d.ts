export = Objective;
declare class Objective {
    /**
     * @param {string} type
     */
    constructor(type: string);
    type: string;
    toJSON(): {
        type: string;
    };
}
