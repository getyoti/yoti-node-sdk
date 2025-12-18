'use strict';

const Validation = require('../../../yoti_common/validation');
const MediaResponse = require('./media.response');

class ShareCodeFileResponse {
  constructor(file) {
    if (file.media) {
      Validation.isPlainObject(file.media, 'media');
      /** @private */
      this.media = new MediaResponse(file.media);
    }
  }

  /**
   * @return MediaResponse
   */
  getMedia() {
    return this.media;
  }
}

module.exports = ShareCodeFileResponse;
