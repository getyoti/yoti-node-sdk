export = DocumentFilter;
declare class DocumentFilter {
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
