export = DocumentFilter;
declare class DocumentFilter {
    /**
     * @param {string} type
     */
    constructor(type: string);
    type: string;
    toJSON(): {
        type: string;
    };
}
