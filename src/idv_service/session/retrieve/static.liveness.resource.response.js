'use strict';

const LivenessResourceResponse = require('./liveness.resource.response');
const Validation = require('../../../yoti_common/validation');
const MediaResponse = require('./media.response');

class StaticLivenessResourceResponse extends LivenessResourceResponse {
  constructor(resource) {
    super(resource);

    const { image } = resource;

    if (image) {
      const { media } = image;

      Validation.isPlainObject(media, 'media');

      /** @private */
      this.image = new MediaResponse(media);
    }
  }

  /**
   * @returns {MediaResponse}
   */
  getImage() {
    return this.image;
  }
}

module.exports = StaticLivenessResourceResponse;
