'use strict';

const Validation = require('../../../yoti_common/validation');
const MediaResponse = require('./media.response');

class ShareCodeIdPhotoResponse {
  constructor(idPhoto) {
    if (idPhoto.media) {
      Validation.isPlainObject(idPhoto.media, 'media');
      /** @private */
      this.media = new MediaResponse(idPhoto.media);
    }
  }

  /**
   * @return MediaResponse
   */
  getMedia() {
    return this.media;
  }
}

module.exports = ShareCodeIdPhotoResponse;
