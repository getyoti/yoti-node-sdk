import constants = require('../yoti_common/constants');
import Validation = require('../yoti_common/validation');

export class AmlAddress {
  private countryCode?: string;
  private postcode?: string;

  constructor(countryCode: string, postcode?: string) {
    this.setCountryCode(countryCode);
    if (typeof postcode !== 'undefined') {
      this.setPostcode(postcode);
    }
  }

  /**
   * @param countryCode
   */
  setCountryCode(countryCode: string) {
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
  setPostcode(postcode: string) {
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
