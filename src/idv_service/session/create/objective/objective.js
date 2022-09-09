'use strict';

const Validation = require('../../../../yoti_common/validation');

class Objective {
  /**
   * @param {string} type
   */
  constructor(type) {
    if (new.target === Objective) {
      throw TypeError('Objective cannot be instantiated');
    }

    Validation.isString(type, 'type');
    this.type = type;
  }

  toJSON() {
    return {
      type: this.type,
    };
  }
}

module.exports = Objective;
