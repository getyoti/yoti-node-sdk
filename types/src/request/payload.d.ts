export class Payload {
    constructor(data: any, type?: string);
    contentType: string;
    data: any;
    /**
     * Get content type.
     *
     * @returns {string}
     */
    getContentType(): string;
    /**
     * Get payload as a Buffer or as a string.
     *
     * @returns {Buffer | string}
     */
    getPayloadData(): Buffer | string;
    /**
     * Get payload as a Base64 string.
     *
     * @returns {string}
     */
    getBase64Payload(): string;
    /**
     * Get raw data.
     *
     * @returns {*}
     */
    getRawData(): any;
}
