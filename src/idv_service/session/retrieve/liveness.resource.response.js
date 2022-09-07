'use strict';

const ResourceResponse = require('./resource.response');
const Validation = require('../../../yoti_common/validation');

class LivenessResourceResponse extends ResourceResponse {
  constructor(resource) {
    super(resource);

    Validation.isString(resource.liveness_type, 'liveness_type', true);
    this.livenessType = resource.liveness_type;
  }

  /**
   * @returns {string}
   */
  getLivenessType() {
    return this.livenessType;
  }
}

module.exports = LivenessResourceResponse;
