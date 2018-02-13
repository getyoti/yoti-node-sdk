'use strict'

const POSTCODE_ATTR = 'post_code';
const COUNTRY_ATTR = 'country';

exports.AmlAddress = class AmlAddress {

  constructor (country, postcode = '') {
    this.country = country;
    this.postcode = postcode;

    this.checkCountry();
  }

  setCountry (country) {
    this.country = country;
  }

  getCountry () {
    return this.country;
  }

  setPostcode (postcode) {
    this.postcode = postcode;
  }

  getPostcode () {
    return this.postcode;
  }

  /**
   * Get address data.
   *
   * @returns {{}}
   */
  getData () {
    let data = {};
    data[POSTCODE_ATTR] = this.postcode;
    data[COUNTRY_ATTR] = this.country.getCode();

    return data;
  }

  /**
   * Check if country is an object.
   */
  checkCountry () {
    // Make sure Country is an object
    if(!this.country) {
      throw new Error('Country should be an object of type Country');
    }
  }

  toString () {
    return JSON.stringify(this.getData());
  }
}