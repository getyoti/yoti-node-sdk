import Image = require('./image');

/**
 * Image PNG attribute value.
 */
class ImagePng extends Image {
  constructor(value: Buffer) {
    super(value, 'image/png');
  }
}

export = ImagePng;
