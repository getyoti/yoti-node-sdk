'use strict';

const Image = require('./image');

/**
 * Image PNG attribute value.
 */
module.exports = class ImagePng extends Image {
  constructor(value) {
    super(value);
    this.MIME_TYPE = 'image/png';
  }

  /**
   * @inheritdoc
   */
  getMimeType() {
    return this.MIME_TYPE;
  }
};
