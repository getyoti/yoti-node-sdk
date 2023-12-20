export = RequiredDocument;
declare class RequiredDocument {
    /**
     * @param {string} type
     */
    constructor(type: string);
    type: string;
    toJSON(): {
        type: string;
    };
}
