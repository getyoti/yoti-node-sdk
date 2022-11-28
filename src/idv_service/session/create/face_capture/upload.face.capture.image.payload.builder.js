'use strict';

const Validation = require('../../../../yoti_common/validation');
const UploadFaceCaptureImagePayload = require('./upload.face.capture.image.payload');

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
    this.imageContentType = 'image/jpg';
    return this;
  }

  /**
   * Sets the content type for uploading a PNG image
   *
   * @return this
   */
  forPngImage() {
    this.imageContentType = 'image/png';
    return this;
  }

  /**
   * Sets the contents of the image to be uploaded
   *
   * @param array<int, int> imageContents
   * @return this
   */
  withImageContents(imageContents) {
    Validation.isArray(imageContents, 'image_contents');
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
