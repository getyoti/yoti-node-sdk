import MediaResponse = require('./media.response');

class ExpandedDocumentFieldsResponse {
  constructor(expandedDocumentFields) {
    if (expandedDocumentFields.media) {
      /** @private */
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

export default ExpandedDocumentFieldsResponse;
