'use strict';

const Validation = require('../../../yoti_common/validation');

class DetailsResponse {
  constructor(details) {
    Validation.isString(details.name, 'name', true);
    this.name = details.name;

    Validation.isString(details.value, 'value', true);
    this.value = details.value;
  }

  /**
   * @returns {string}
   */
  getName() {
    return this.name;
  }

  /**
   * @returns {string}
   */
  getValue() {
    return this.value;
  }
}

module.exports = DetailsResponse;
