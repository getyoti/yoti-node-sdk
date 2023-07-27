'use strict';

const Validation = require('../../../yoti_common/validation');

class CreateFaceCaptureResourceResponse {
  /**
   * @param {object} sessionData
   */
  constructor(sessionData) {
    Validation.isPlainObject(sessionData, 'session_data');

    if (sessionData.id) {
      Validation.isString(sessionData.id, 'id');
      this.id = sessionData.id;
    }

    if (sessionData.frames) {
      Validation.isInteger(sessionData.frames, 'frames');
      this.frames = sessionData.frames;
    }
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
