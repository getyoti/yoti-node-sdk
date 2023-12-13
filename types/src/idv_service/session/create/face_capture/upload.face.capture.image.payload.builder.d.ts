export = UploadFaceCaptureImagePayloadBuilder;
/**
 *
 * @class UploadFaceCaptureImagePayloadBuilder
 */
declare class UploadFaceCaptureImagePayloadBuilder {
    /**
       * Sets the content type for uploading a JPEG image
       *
       * @return this
       */
    forJpegImage(): this;
    imageContentType: string;
    /**
     * Sets the content type for uploading a PNG image
     *
     * @return this
     */
    forPngImage(): this;
    /**
     * Sets the contents of the image to be uploaded
     *
     * @param {Buffer} imageContents
     * @return this
     */
    withImageContents(imageContents: Buffer): this;
    imageContents: Buffer;
    /**
     * @return UploadFaceCaptureImagePayload
     */
    build(): UploadFaceCaptureImagePayload;
}
import UploadFaceCaptureImagePayload = require("./upload.face.capture.image.payload");
