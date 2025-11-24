import Validation = require('../../../yoti_common/validation');
import FaceCaptureImageResponse = require('./face.capture.image.response');
import ResourceResponse = require('./resource.response');

class FaceCaptureResourceResponse extends ResourceResponse {
  constructor(resource) {
    super(resource);

    if (resource.image) {
      Validation.isPlainObject(resource.image, 'media');
      /** @private */
      this.image = new FaceCaptureImageResponse(resource.image);
    }
  }

  /**
   * @return FaceCaptureImageResponse
   */
  getImage() {
    return this.image;
  }
}

export default FaceCaptureResourceResponse;
