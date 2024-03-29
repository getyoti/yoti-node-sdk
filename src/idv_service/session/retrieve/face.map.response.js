'use strict';

const MediaResponse = require('./media.response');

class FaceMapResponse {
  constructor(facemap) {
    if (facemap.media) {
      /** @private */
      this.media = new MediaResponse(facemap.media);
    }
  }

  /**
   * @returns {MediaResponse}
   */
  getMedia() {
    return this.media;
  }
}

module.exports = FaceMapResponse;
