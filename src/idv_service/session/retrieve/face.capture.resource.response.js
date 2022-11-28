'use strict';

const ResourceResponse = require('./resource.response');

class FaceCaptureResourceResponse extends ResourceResponse {
  /**
   * @return FaceCaptureImageResponse
   */
  getImage() {
    return this.image;
  }
}

module.exports = FaceCaptureResourceResponse;
