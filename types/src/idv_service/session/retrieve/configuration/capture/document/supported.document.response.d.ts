export = SupportedDocumentResponse;
declare class SupportedDocumentResponse {
    /**
     * @param {object} supportedDocument
     */
    constructor(supportedDocument: object);
    /** @private */
    private type;
    /** @private */
    private providers;
    /**
     * Returns the type of document that is supported.
     *
     * @return {string | null}
     */
    getType(): string | null;
    /**
     * Returns the digital ID providers supported for this document type.
     *
     * @return {string[] | null}
     */
    getProviders(): string[] | null;
}
