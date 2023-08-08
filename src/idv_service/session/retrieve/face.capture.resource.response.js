'use strict';

const Validation = require('../../../yoti_common/validation');
const FaceCaptureImageResponse = require('./face.capture.image.response');
const ResourceResponse = require('./resource.response');

class FaceCaptureResourceResponse extends ResourceResponse {
  constructor(resource) {
    super(resource);

    if (resource.image) {
      Validation.isPlainObject(resource.image);
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

module.exports = FaceCaptureResourceResponse;
