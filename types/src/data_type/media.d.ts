export = Media;
declare class Media {
    /**
     * @param {Buffer} content
     * @param {string} mimeType
     */
    constructor(content: Buffer, mimeType: string);
    /** @private */
    private content;
    /** @private */
    private mimeType;
    /**
     * Get the raw image content.
     *
     * @returns {Buffer}
     */
    getContent(): Buffer;
    /**
     * Get the base64 image content.
     *
     * @returns {string}
     */
    getBase64Content(): string;
    /**
     * Get the image mime type.
     *
     * @returns {string}
     */
    getMimeType(): string;
}
