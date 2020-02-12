'use strict';

const Validation = require('../../../yoti_common/validation');

class GeneratedMedia {
  constructor(media) {
    Validation.isString(media.id, 'id', true);
    this.id = media.id;

    Validation.isString(media.type, 'type', true);
    this.type = media.type;
  }

  getId() {
    return this.id;
  }

  getType() {
    return this.type;
  }
}

module.exports = GeneratedMedia;
