import MediaResponse = require('./media.response');

class DocumentIdPhotoResponse {
  constructor(documentFields) {
    if (documentFields.media) {
      /** @private */
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

export default DocumentIdPhotoResponse;
