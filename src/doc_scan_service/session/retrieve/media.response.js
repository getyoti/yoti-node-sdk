'use strict';

const Validation = require('../../../yoti_common/validation');

class MediaResponse {
  constructor(media) {
    Validation.isString(media.id, 'id', true);
    this.id = media.id;

    Validation.isString(media.type, 'type', true);
    this.type = media.type;

    Validation.isString(media.created, 'created', true);
    this.created = media.created;

    Validation.isString(media.last_updated, 'last_updated', true);
    this.lastUpdated = media.last_updated;
  }

  getId() {
    return this.id;
  }

  getType() {
    return this.type;
  }

  getCreated() {
    return this.created;
  }

  getLastUpdated() {
    return this.lastUpdated;
  }
}

module.exports = MediaResponse;
