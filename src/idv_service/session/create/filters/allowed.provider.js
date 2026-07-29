'use strict';

const Validation = require('../../../../yoti_common/validation');

class AllowedProvider {
  /**
   * @param {string} name
   */
  constructor(name) {
    Validation.isString(name, 'name');
    /** @private */
    this.name = name;
  }

  toJSON() {
    return {
      name: this.name,
    };
  }
}

module.exports = AllowedProvider;
