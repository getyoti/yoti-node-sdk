'use strict';

const Image = require('./image');

/**
 * Image JPEG attribute value.
 */
module.exports = class ImageJpeg extends Image {
  constructor(value) {
    super(value);
    this.MIME_TYPE = 'image/jpeg';
  }

  /**
   * @inheritdoc
   */
  getMimeType() {
    return this.MIME_TYPE;
  }
};
