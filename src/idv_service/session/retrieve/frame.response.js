'use strict';

const MediaResponse = require('./media.response');

class FrameResponse {
  constructor(frame) {
    if (frame.media) {
      /** @private */
      this.media = new MediaResponse(frame.media);
    }
  }

  /**
   * @returns {MediaResponse}
   */
  getMedia() {
    return this.media;
  }
}

module.exports = FrameResponse;
