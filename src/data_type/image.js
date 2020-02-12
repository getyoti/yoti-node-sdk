'use strict';

const Media = require('./media');

/**
 * Abstract Image class.
 */
class Image extends Media {
  /**
   * @param {ByteBuffer} content
   * @param {string} mimeType
   */
  constructor(content, mimeType) {
    if (new.target === Image) {
      throw TypeError('Image is an abstract class, so cannot be instantiated');
    }
    super(content, mimeType);
  }
}

module.exports = Image;
