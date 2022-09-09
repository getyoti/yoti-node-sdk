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
    this.inclusion = inclusion;

    Validation.isArrayOfStrings(countryCodes, 'countryCodes');
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
