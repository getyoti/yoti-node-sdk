'use strict';

const Validation = require('../../../yoti_common/validation');

class CreateFaceCaptureResourceResponse {
  /**
   * @param {{id: string, frames: number}} resourceData
   */
  constructor(resourceData) {
    Validation.isPlainObject(resourceData, 'resourceData');
    Validation.isString(resourceData.id, 'resourceData.id');
    Validation.isNumber(resourceData.frames, 'resourceData.frames');
    this.id = resourceData.id;
    this.frames = resourceData.frames;
  }

  /**
   * Returns the ID of the newly created Face Capture resource
   *
   * @return string
   */
  getId() {
    return this.id;
  }

  /**
   * Returns the number of image frames required
   *
   * @return int
   */
  getFrames() {
    return this.frames;
  }
}

module.exports = CreateFaceCaptureResourceResponse;
