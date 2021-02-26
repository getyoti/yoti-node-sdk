export = TypeRestriction;
declare class TypeRestriction {
    /**
     * @param {string} inclusion
     * @param {string[]} documentTypes
     */
    constructor(inclusion: string, documentTypes: string[]);
    inclusion: string;
    documentTypes: string[];
    toJSON(): {
        inclusion: string;
        document_types: string[];
    };
}
