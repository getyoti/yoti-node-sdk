'use strict';

/**
 * Abstract Image attribute class.
 */
module.exports = class Image {
  /**
   * Image constructor.
   *
   * @param {ByteBuffer} content
   * @param {string} mimeType
   */
  constructor(content, mimeType) {
    if (new.target === Image) {
      throw TypeError('Image is an abstract class, so cannot be instantiated');
    }
    if (typeof mimeType === 'undefined') {
      throw TypeError(`${this.constructor.name} must pass mimeType to the Image constructor`);
    }
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
};
