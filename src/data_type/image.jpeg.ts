import Image = require('./image');

/**
 * Image JPEG attribute value.
 */
class ImageJpeg extends Image {
  constructor(value: Buffer) {
    super(value, 'image/jpeg');
  }
}

export = ImageJpeg;
