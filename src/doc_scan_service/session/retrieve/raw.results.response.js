'use strict';

const MediaResponse = require('./media.response');

class RawResultsResponse {
  constructor(rawResults) {
    if (rawResults.media) {
      this.media = new MediaResponse(rawResults.media);
    }
  }

  /**
   * @returns {MediaResponse}
   */
  getMedia() {
    return this.media;
  }
}

module.exports = RawResultsResponse;
