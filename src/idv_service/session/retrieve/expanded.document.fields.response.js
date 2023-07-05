'use strict';

const MediaResponse = require('./media.response');

class ExpandedDocumentFieldsResponse {
  constructor(expandedDocumentFields) {
    if (expandedDocumentFields.media) {
      this.media = new MediaResponse(expandedDocumentFields.media);
    }
  }

  /**
   * @returns {MediaResponse}
   */
  getMedia() {
    return this.media;
  }
}

module.exports = ExpandedDocumentFieldsResponse;
