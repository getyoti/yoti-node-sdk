export = DocumentRestriction;
declare class DocumentRestriction {
    /**
     * @param {string[]} countryCodes
     * @param {string[]} documentTypes
     */
    constructor(countryCodes: string[], documentTypes: string[]);
    /** @private */
    private countryCodes;
    /** @private */
    private documentTypes;
    toJSON(): {
        document_types: string[];
        country_codes: string[];
    };
}
