'use strict';

const ResourceResponse = require('./resource.response');

class LivenessResourceResponse extends ResourceResponse {
  constructor(resource) {
    if (new.target === LivenessResourceResponse) {
      throw TypeError(`${new.target.name} cannot be instantiated`);
    }

    super(resource);
  }
}

module.exports = LivenessResourceResponse;
