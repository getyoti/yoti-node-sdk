export = RequiredDocument;
declare class RequiredDocument {
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
