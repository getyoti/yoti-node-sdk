import MediaResponse = require('./media.response');

class FileResponse {
  constructor(file) {
    if (file.media) {
      /** @private */
      this.media = new MediaResponse(file.media);
    }
  }

  /**
   * @returns {MediaResponse}
   */
  getMedia() {
    return this.media;
  }
}

export default FileResponse;
