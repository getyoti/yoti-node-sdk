'use strict';

const Validation = require('../../../../yoti_common/validation');

/**
 *
 * @class UploadFaceCaptureImagePayload
 */
class UploadFaceCaptureImagePayload {
  /**
   * @param {string} imageContentType
   * @param {Buffer} imageContents
   */
  constructor(imageContentType, imageContents) {
    Validation.isString(imageContentType, 'image_content_type');
    /** @private */
    this.imageContentType = imageContentType;

    Validation.instanceOf(imageContents, Buffer, 'image_contents');
    /** @private */
    this.imageContents = imageContents;
  }

  /**
   * @return string
   */
  getImageContentType() {
    return this.imageContentType;
  }

  /**
   * @return Buffer
   */
  getImageContents() {
    return this.imageContents;
  }

  /**
   * @return {Array<{
   *  name: string,
   *  value: Buffer,
   *  options: {filename: string, contentType: string}
   * }>}
   */
  getFormDataFields() {
    return [
      {
        name: 'binary-content',
        value: this.getImageContents(),
        options: {
          filename: 'face-capture-image',
          contentType: this.getImageContentType(),
        },
      },
    ];
  }
}

module.exports = UploadFaceCaptureImagePayload;
