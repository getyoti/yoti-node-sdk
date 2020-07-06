'use strict';

const MediaResponse = require('./media.response');

class DocumentIdPhotoResponse {
  constructor(documentFields) {
    if (documentFields.media) {
      this.media = new MediaResponse(documentFields.media);
    }
  }

  /**
   * @returns {MediaResponse}
   */
  getMedia() {
    return this.media;
  }
}

module.exports = DocumentIdPhotoResponse;
