'use strict';

const Validation = require('../../yoti_common/validation');

/**
 * Defines the wanted anchor value and sub type.
 *
 * @class WantedAnchor
 */
module.exports = class WantedAnchor {
  /**
   * @param {string} value
   * @param {string} subType
   */
  constructor(value, subType = '') {
    Validation.isString(value, 'value');
    this.value = value;

    Validation.isString(subType, 'subType');
    this.subType = subType;
  }

  /**
   * @returns {Object} data for JSON.stringify()
   */
  toJSON() {
    return {
      name: this.value,
      sub_type: this.subType,
    };
  }
};
