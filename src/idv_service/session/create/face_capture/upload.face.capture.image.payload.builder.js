'use strict';

const Validation = require('../../../../yoti_common/validation');
const UploadFaceCaptureImagePayload = require('./upload.face.capture.image.payload');

const JPG_CONTENT_TYPE = 'image/jpg';
const PNG_CONTENT_TYPE = 'image/png';

/**
 *
 * @class UploadFaceCaptureImagePayloadBuilder
 */
class UploadFaceCaptureImagePayloadBuilder {
  /**
     * Sets the content type for uploading a JPEG image
     *
     * @return this
     */
  forJpegImage() {
    this.imageContentType = JPG_CONTENT_TYPE;
    return this;
  }

  /**
   * Sets the content type for uploading a PNG image
   *
   * @return this
   */
  forPngImage() {
    this.imageContentType = PNG_CONTENT_TYPE;
    return this;
  }

  /**
   * Sets the contents of the image to be uploaded
   *
   * @param {Buffer} imageContents
   * @return this
   */
  withImageContents(imageContents) {
    Validation.instanceOf(imageContents, Buffer, 'image_contents');
    this.imageContents = imageContents;
    return this;
  }

  /**
   * @return UploadFaceCaptureImagePayload
   */
  build() {
    return new UploadFaceCaptureImagePayload(this.imageContentType, this.imageContents);
  }
}

module.exports = UploadFaceCaptureImagePayloadBuilder;
