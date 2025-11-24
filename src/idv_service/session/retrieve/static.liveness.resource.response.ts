import LivenessResourceResponse = require('./liveness.resource.response');
import Validation = require('../../../yoti_common/validation');
import MediaResponse = require('./media.response');

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

export default StaticLivenessResourceResponse;
