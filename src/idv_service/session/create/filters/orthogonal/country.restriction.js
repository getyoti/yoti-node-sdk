'use strict';

const Validation = require('../../../../../yoti_common/validation');

class CountryRestriction {
  /**
   * @param {string} inclusion
   * @param {string[]} countryCodes
   */
  constructor(inclusion, countryCodes) {
    Validation.notNullOrEmpty(inclusion, 'inclusion');
    Validation.isString(inclusion, 'inclusion');
    /** @private */
    this.inclusion = inclusion;

    Validation.isArrayOfStrings(countryCodes, 'countryCodes');
    /** @private */
    this.countryCodes = countryCodes;
  }

  toJSON() {
    return {
      inclusion: this.inclusion,
      country_codes: this.countryCodes,
    };
  }
}

module.exports = CountryRestriction;
