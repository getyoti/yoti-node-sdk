'use strict'

// AML profile attributes
const GIVEN_NAMES_ATTR  = 'given_names';
const FAMILY_NAME_ATTR  = 'family_name';
const SSN_ATTR          = 'ssn';
const ADDRESS_ATTR      = 'address';

exports.AmlProfile = class AmlProfile {

  constructor (givenNames, familyName, amlAddress, ssn = '') {
    this.givenNames = givenNames;
    this.familyName = familyName;
    this.amlAddress = amlAddress;
    this.ssn = ssn;

    // Check if amlAddress is an object.
    AmlProfile.checkAmlAddress(amlAddress);
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
    AmlProfile.checkAmlAddress(amlAddress);
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
  static checkAmlAddress (amlAddress) {
    if(!amlAddress) {
      throw new Error('AmlAddress should be an object of type Entity/AmlAddress');
    }
  }

  /**
   * Get profile data.
   *
   * @returns {{}}
   */
  getData () {
    let data = {};
    data[GIVEN_NAMES_ATTR] = this.givenNames;
    data[FAMILY_NAME_ATTR] = this.familyName;
    data[SSN_ATTR] = this.ssn;
    data[ADDRESS_ATTR] = this.amlAddress.getData();

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

