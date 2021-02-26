export = Media;
declare class Media {
    /**
     * @param {Buffer|ByteBuffer} content
     * @param {string} mimeType
     */
    constructor(content: Buffer | any, mimeType: string);
    content: any;
    mimeType: string;
    /**
     * Get the raw image content.
     *
     * @returns {ByteBuffer}
     */
    getContent(): any;
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
