'use strict';

/**
 * Abstract Image attribute class.
 */
module.exports = class Image {
  constructor(content) {
    if (new.target === Image) {
      throw TypeError('new of abstract class Image');
    }
    this.content = content;
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
   * Abstract method to return the image mime type.
   *
   * @returns {string}
   */
  getMimeType() {
    throw new Error(`${this.constructor.name} must implement getMimeType()`);
  }
};
