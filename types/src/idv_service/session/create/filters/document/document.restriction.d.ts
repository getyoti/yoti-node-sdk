export = DocumentRestriction;
declare class DocumentRestriction {
    /**
     * @param {string[]} countryCodes
     * @param {string[]} documentTypes
     */
    constructor(countryCodes: string[], documentTypes: string[]);
    countryCodes: string[];
    documentTypes: string[];
    toJSON(): {
        document_types: string[];
        country_codes: string[];
    };
}
