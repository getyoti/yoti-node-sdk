'use strict'

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

    this.checkAmlAddress(amlAddress);
  }

  setGivenNames (givenNames) {
    this.givenNames = givenNames;
  }

  getGivenNames () {
    return this.givenNames;
  }

  setFamilyName (familyName) {
    this.familyName = familyName;
  }

  getFamilyName () {
    return this.familyName;
  }

  setAmlAddress (amlAddress) {
    this.checkAmlAddress(amlAddress);
    this.amlAddress = amlAddress;
  }

  getAmlAddress () {
    return this.amlAddress;
  }

  setSsn (ssn) {
    this.ssn = ssn;
  }

  getSsn () {
    return this.ssn;
  }

  /**
   *
   * @param amlAddress
   */
  checkAmlAddress (amlAddress) {
    // Make sure AmlAddress is an object
    if(!amlAddress) {
      throw new Error('AmlAddress should be an object of type AmlAddress');
    }
  }

  /**
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

  toString () {
    return JSON.stringify(this.getData());
  }
}

