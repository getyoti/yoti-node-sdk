'use strict';

const ByteBuffer = require('bytebuffer');
const Validation = require('../yoti_common/validation');

class Media {
  /**
   * @param {Buffer|ByteBuffer} content
   * @param {string} mimeType
   */
  constructor(content, mimeType) {
    if (Buffer.isBuffer(content)) {
      this.content = ByteBuffer.wrap(content);
    } else if (ByteBuffer.isByteBuffer(content)) {
      this.content = content;
    } else {
      throw new TypeError('content must be of type Buffer|ByteBuffer');
    }

    Validation.isString(mimeType, 'mimeType');
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
