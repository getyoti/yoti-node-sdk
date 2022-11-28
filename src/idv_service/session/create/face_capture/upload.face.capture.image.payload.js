'use strict';

const Validation = require('../../../../yoti_common/validation');

/**
 *
 * @class UploadFaceCaptureImagePayload
 */
class UploadFaceCaptureImagePayload {
  /**
   * @param string $imageContentType
   * @param array<int, int> $imageContents
   */
  constructor(imageContentType, imageContents) {
    Validation.isString(imageContentType, 'image_content_type');
    this.imageContentType = imageContentType;

    Validation.isArrayOfType(imageContents, Buffer, 'image_contents');
    this.imageContents = imageContents;
  }

  /**
   * @return string
   */
  getImageContentType() {
    return this.imageContentType;
  }

  /**
   * @return array<int, int>
   */
  getImageContents() {
    return this.imageContents;
  }
}

module.exports = UploadFaceCaptureImagePayload;
