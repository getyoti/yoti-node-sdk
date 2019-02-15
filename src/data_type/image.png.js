'use strict';

const Image = require('./image');

/**
 * Image PNG attribute value.
 */
module.exports = class ImagePng extends Image {
  constructor(value) {
    super(value, 'image/png');
  }
};
