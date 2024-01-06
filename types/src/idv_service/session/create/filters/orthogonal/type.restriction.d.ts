export = TypeRestriction;
declare class TypeRestriction {
    /**
     * @param {string} inclusion
     * @param {string[]} documentTypes
     */
    constructor(inclusion: string, documentTypes: string[]);
    /** @private */
    private inclusion;
    /** @private */
    private documentTypes;
    toJSON(): {
        inclusion: string;
        document_types: string[];
    };
}
