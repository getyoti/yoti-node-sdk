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
    imageContentType: string;
    imageContents: Buffer;
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
