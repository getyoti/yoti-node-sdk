'use strict';

const ResourceResponse = require('./resource.response');

class LivenessResourceResponse extends ResourceResponse {
  constructor(livenessType, resource) {
    if (new.target === LivenessResourceResponse) {
      throw TypeError(`${new.target.name} cannot be instantiated`);
    }

    super(resource);
    this.livenessType = livenessType;
  }

  getLivenessType() {
    return this.livenessType;
  }
}

module.exports = LivenessResourceResponse;
