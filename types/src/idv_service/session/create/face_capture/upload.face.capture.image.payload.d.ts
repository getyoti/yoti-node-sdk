export = UploadFaceCaptureImagePayload;
/**
 *
 * @class UploadFaceCaptureImagePayload
 */
declare class UploadFaceCaptureImagePayload {
    /**
     * @param {string} imageContentType
     * @param {Buffer} imageContents
     */
    constructor(imageContentType: string, imageContents: Buffer);
    /** @private */
    private imageContentType;
    /** @private */
    private imageContents;
    /**
     * @return string
     */
    getImageContentType(): string;
    /**
     * @return Buffer
     */
    getImageContents(): Buffer;
    /**
     * @return {Array<{
     *  name: string,
     *  value: Buffer,
     *  options: {filename: string, contentType: string}
     * }>}
     */
    getFormDataFields(): Array<{
        name: string;
        value: Buffer;
        options: {
            filename: string;
            contentType: string;
        };
    }>;
}
