'use strict'

// AML address attributes
const POSTCODE_ATTR = 'post_code';
const COUNTRY_ATTR = 'country';

exports.AmlAddress = class AmlAddress {

  constructor (country, postcode = '') {
    this.country = country;
    this.postcode = postcode;

    // Check if country is an object
    this.checkCountry();
  }

  /**
   * @param country
   */
  setCountry (country) {
    this.country = country;
  }

  /**
   * @returns country
   */
  getCountry () {
    return this.country;
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
    data[POSTCODE_ATTR] = this.postcode;
    data[COUNTRY_ATTR] = this.country.getCode();

    return data;
  }

  /**
   * Check if country is an object.
   */
  checkCountry () {
    // Make sure country is an object
    if(!this.country) {
      throw new Error('Country should be an object of type Entity/Country');
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