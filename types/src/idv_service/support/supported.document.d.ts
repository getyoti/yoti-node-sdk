export = SupportedDocument;
declare class SupportedDocument {
    constructor(document: any);
    /** @private */
    private type;
    /** @private */
    private isStrictlyLatin;
    /**
     *
     * @return {string|undefined}
     */
    getType(): string | undefined;
    /**
     *
     * @return {boolean|undefined}
     */
    getIsStrictlyLatin(): boolean | undefined;
}
