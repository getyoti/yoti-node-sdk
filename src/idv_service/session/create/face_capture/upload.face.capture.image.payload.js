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
    this.imageContentType = imageContentType;

    Validation.instanceOf(imageContents, Buffer, 'image_contents');
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
   * @typedef {import('form-data').AppendOptions} AppendOptions
   *
   * @return {Array<{
   *  name: string,
   *  value: any,
   *  options: AppendOptions
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
