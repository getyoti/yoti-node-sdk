'use strict';

const Validation = require('../../../yoti_common/validation');
const MediaResponse = require('./media.response');

class FaceCaptureImageResponse {
  constructor(image) {
    if (image.media) {
      Validation.isPlainObject(image.media, 'media');
      /** @private */
      this.media = new MediaResponse(image.media);
    }
  }

  /**
   * @return MediaResponse
   */
  getMedia() {
    return this.media;
  }
}

module.exports = FaceCaptureImageResponse;
