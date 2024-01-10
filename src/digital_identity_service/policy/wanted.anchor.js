'use strict';

const Validation = require('../../yoti_common/validation');

/**
 * Defines the wanted anchor value and subtype.
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
    /** @private */
    this.value = value;

    Validation.isString(subType, 'subType');
    /** @private */
    this.subType = subType;
  }

  /**
   * Returns serialized data for JSON.stringify()
   */
  toJSON() {
    return {
      name: this.value,
      sub_type: this.subType,
    };
  }
};
