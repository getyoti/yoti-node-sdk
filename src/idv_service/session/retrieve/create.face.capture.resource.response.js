'use strict';

const Validation = require('../../../yoti_common/validation');

class CreateFaceCaptureResourceResponse {
  /**
   * @param array<string,mixed> $sessionData
   */
  constructor(sessionData) {
    Validation.isArray(sessionData, 'session_data');
    this.id = sessionData.id;
    this.frames = sessionData.frames;
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
