'use strict'

const constants = require('../yoti_common/constants');

exports.AmlProfile = class AmlProfile {

  constructor (givenNames, familyName, amlAddress, ssn = '') {
    this.givenNames = givenNames;
    this.familyName = familyName;
    this.amlAddress = amlAddress;
    this.ssn = ssn;

    AmlProfile.validateAmlAddress(amlAddress);
  }

  /**
   * @param givenNames
   */
  setGivenNames (givenNames) {
    this.givenNames = givenNames;
  }

  /**
   * @returns {*}
   */
  getGivenNames () {
    return this.givenNames;
  }

  /**
   * @param familyName
   */
  setFamilyName (familyName) {
    this.familyName = familyName;
  }

  /**
   * @returns familyName
   */
  getFamilyName () {
    return this.familyName;
  }

  /**
   * @param amlAddress
   */
  setAmlAddress (amlAddress) {
    AmlProfile.validateAmlAddress(amlAddress);
    this.amlAddress = amlAddress;
  }

  /**
   * @returns amlAddress
   */
  getAmlAddress () {
    return this.amlAddress;
  }

  /**
   * @param ssn
   */
  setSsn (ssn) {
    this.ssn = ssn;
  }

  /**
   * @returns ssn
   */
  getSsn () {
    return this.ssn;
  }

  /**
   * Check if amlAddress is an object.
   *
   * @param amlAddress
   */
  static validateAmlAddress (amlAddress) {
    if(!amlAddress) {
      throw new Error('AmlAddress should be an object of Type/AmlAddress');
    }
  }

  /**
   * Get profile data.
   *
   * @returns {{}}
   */
  getData () {
    let data = {};
    data[constants.GIVEN_NAMES_ATTR] = this.givenNames;
    data[constants.FAMILY_NAME_ATTR] = this.familyName;
    data[constants.SSN_ATTR] = this.ssn;
    data[constants.ADDRESS_ATTR] = this.amlAddress.getData();

    return data;
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

