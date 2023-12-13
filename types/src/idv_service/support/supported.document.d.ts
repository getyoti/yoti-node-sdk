export = SupportedDocument;
declare class SupportedDocument {
    constructor(document: any);
    type: any;
    isStrictlyLatin: any;
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
