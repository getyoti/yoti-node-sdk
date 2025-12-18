'use strict';

const Validation = require('../../../yoti_common/validation');
const MediaResponse = require('./media.response');

class ShareCodeLookupProfileResponse {
  constructor(lookupProfile) {
    if (lookupProfile.media) {
      Validation.isPlainObject(lookupProfile.media, 'media');
      /** @private */
      this.media = new MediaResponse(lookupProfile.media);
    }
  }

  /**
   * @return MediaResponse
   */
  getMedia() {
    return this.media;
  }
}

module.exports = ShareCodeLookupProfileResponse;
