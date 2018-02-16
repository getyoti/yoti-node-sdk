'use strict'

const constants = require('../yoti_common/constants');

exports.AmlAddress = class AmlAddress {

  constructor (countryCode, postcode = '') {
    this.countryCode = countryCode;
    this.postcode = postcode;

    this.checkCountryCode();
  }

  /**
   * @param countryCode
   */
  setCountryCode (countryCode) {
    this.countryCode = countryCode;
  }

  /**
   * @returns country
   */
  getCountryCode () {
    return this.countryCode;
  }

  /**
   * @param postcode
   */
  setPostcode (postcode) {
    this.postcode = postcode;
  }

  /**
   * @returns postcode
   */
  getPostcode () {
    return this.postcode;
  }

  /**
   * @returns {{}}
   */
  getData () {
    let data = {};
    data[constants.POSTCODE_ATTR] = this.postcode;
    data[constants.COUNTRY_ATTR] = this.countryCode;

    return data;
  }

  checkCountryCode () {
    if(this.countryCode === '') {
      throw new Error('CountryCode cannot be empty');
    }
  }

  /**
   * Returns a string representing the object.
   *
   * @returns {string}
   */
  toString () {
    return JSON.stringify(this.getData());
  }
}