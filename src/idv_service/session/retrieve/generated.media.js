'use strict';

const Validation = require('../../../yoti_common/validation');

class GeneratedMedia {
  constructor(media) {
    Validation.isString(media.id, 'id', true);
    /** @private */
    this.id = media.id;

    Validation.isString(media.type, 'type', true);
    /** @private */
    this.type = media.type;
  }

  /**
   * @returns {string}
   */
  getId() {
    return this.id;
  }

  /**
   * @returns {string}
   */
  getType() {
    return this.type;
  }
}

module.exports = GeneratedMedia;
