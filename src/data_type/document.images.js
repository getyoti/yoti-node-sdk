'use strict';

const ImageJpeg = require('./image.jpeg');
const ImagePng = require('./image.png');
const MultiValue = require('./multi.value');

module.exports = class DocumentImages {
  /**
   * Document Images constructor.
   *
   * @param {MultiValue} multiValue
   */
  constructor(multiValue) {
    if (!(multiValue instanceof MultiValue)) {
      throw new TypeError(`${this.constructor.name} must be provided an instance of MultiValue`);
    }

    // Filter values to known image types.
    this.values = multiValue
      .filter(ImageJpeg)
      .filter(ImagePng)
      .getValues();

    // Prevent changes to document images.
    Object.freeze(this);
  }

  /**
   * @returns {Array} List of images.
   */
  getImages() {
    return this.values;
  }
};
