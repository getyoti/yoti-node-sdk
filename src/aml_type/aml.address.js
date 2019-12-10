'use strict';

const constants = require('../yoti_common/constants');
const Validation = require('../yoti_common/validation');

module.exports.AmlAddress = class AmlAddress {
  constructor(countryCode, postcode) {
    this.setCountryCode(countryCode);
    if (typeof postcode !== 'undefined') {
      this.setPostcode(postcode);
    }
  }

  /**
   * @param countryCode
   */
  setCountryCode(countryCode) {
    Validation.notNullOrEmpty(countryCode, 'countryCode');
    this.countryCode = countryCode;
  }

  /**
   * @returns country
   */
  getCountryCode() {
    return this.countryCode;
  }

  /**
   * @param postcode
   */
  setPostcode(postcode) {
    this.postcode = postcode;
  }

  /**
   * @returns postcode
   */
  getPostcode() {
    return this.postcode;
  }

  /**
   * @returns {{}}
   */
  getData() {
    const data = {};
    data[constants.POSTCODE_ATTR] = this.postcode;
    data[constants.COUNTRY_ATTR] = this.countryCode;

    return data;
  }

  /**
   * @param countryCode
   *
   * @deprecated Replaced by Validation.notNullOrEmpty()
   */
  validateCountryCode() {
    Validation.notNullOrEmpty(this.countryCode, 'countryCode');
  }

  /**
   * Returns a string representing the object.
   *
   * @returns {string}
   */
  toString() {
    return JSON.stringify(this.getData());
  }
};
