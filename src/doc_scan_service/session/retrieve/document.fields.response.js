'use strict';

const MediaResponse = require('./media.response');

class DocumentFieldsResponse {
  constructor(documentFields) {
    if (documentFields.media) {
      this.media = new MediaResponse(documentFields.media);
    }
  }

  getMedia() {
    return this.media;
  }
}

module.exports = DocumentFieldsResponse;
