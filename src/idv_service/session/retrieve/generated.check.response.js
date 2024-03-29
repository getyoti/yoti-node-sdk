'use strict';

const Validation = require('../../../yoti_common/validation');

class GeneratedCheckResponse {
  constructor(check) {
    Validation.isString(check.id, 'id', true);
    /** @private */
    this.id = check.id;

    Validation.isString(check.type, 'type', true);
    /** @private */
    this.type = check.type;
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

module.exports = GeneratedCheckResponse;
