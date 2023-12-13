export = SupportedDocumentResponse;
declare class SupportedDocumentResponse {
    /**
     * @param {object} supportedDocument
     */
    constructor(supportedDocument: object);
    type: any;
    /**
     * Returns the type of document that is supported.
     *
     * @return {string | null}
     */
    getType(): string | null;
}
