'use strict';

const Validation = require('../../../yoti_common/validation');

class GeneratedCheckResponse {
  constructor(check) {
    Validation.isString(check.id, 'id', true);
    this.id = check.id;
  }

  /**
   * @returns {string}
   */
  getId() {
    return this.id;
  }
}

module.exports = GeneratedCheckResponse;
