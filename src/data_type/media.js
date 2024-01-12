'use strict';

const Validation = require('../yoti_common/validation');

class Media {
  /**
   * @param {Buffer} content
   * @param {string} mimeType
   */
  constructor(content, mimeType) {
    if (Buffer.isBuffer(content)) {
      /** @private */
      this.content = content;
    } else {
      throw new TypeError('content must be of type Buffer');
    }

    Validation.isString(mimeType, 'mimeType');
    /** @private */
    this.mimeType = mimeType;
  }

  /**
   * Get the raw image content.
   *
   * @returns {Buffer}
   */
  getContent() {
    return this.content;
  }

  /**
   * Get the base64 image content.
   *
   * @returns {string}
   */
  getBase64Content() {
    return `data:${this.getMimeType()};base64,${this.content.toString('base64')}`;
  }

  /**
   * Get the image mime type.
   *
   * @returns {string}
   */
  getMimeType() {
    return this.mimeType;
  }
}

module.exports = Media;
