import MediaResponse = require('./media.response');

class GeneratedProfileResponse {
  constructor(generatedProfile) {
    if (generatedProfile.media) {
      /** @private */
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

export default GeneratedProfileResponse;
