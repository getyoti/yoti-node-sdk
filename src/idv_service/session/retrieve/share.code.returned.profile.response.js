'use strict';

const Validation = require('../../../yoti_common/validation');
const MediaResponse = require('./media.response');

class ShareCodeReturnedProfileResponse {
  constructor(returnedProfile) {
    if (returnedProfile.media) {
      Validation.isPlainObject(returnedProfile.media, 'media');
      /** @private */
      this.media = new MediaResponse(returnedProfile.media);
    }
  }

  /**
   * @return MediaResponse
   */
  getMedia() {
    return this.media;
  }
}

module.exports = ShareCodeReturnedProfileResponse;
