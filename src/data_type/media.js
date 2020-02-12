'use strict';

const Validation = require('../yoti_common/validation');

class Media {
  /**
   * @param {ByteBuffer} content
   * @param {string} mimeType
   */
  constructor(content, mimeType) {
    Validation.isFunction(content.toBase64, 'content.toBase64');
    Validation.isString(mimeType, 'mimeType');
    this.content = content;
    this.mimeType = mimeType;
  }

  /**
   * Get the raw image content.
   *
   * @returns {ByteBuffer}
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
    return `data:${this.getMimeType()};base64,${this.content.toBase64()}`;
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
