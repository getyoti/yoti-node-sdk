'use strict';

const MediaResponse = require('./media.response');

class GeneratedProfileResponse {
  constructor(generatedProfile) {
    if (generatedProfile.media) {
      this.media = new MediaResponse(generatedProfile.media);
    }
  }

  /**
   * @returns {MediaResponse}
   */
  getMedia() {
    return this.media;
  }
}

module.exports = GeneratedProfileResponse;
