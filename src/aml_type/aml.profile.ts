import constants = require('../yoti_common/constants');

export class AmlProfile {
  private givenNames?: string;
  private familyName?: string;
  private amlAddress?: any;
  private ssn?: string;

  constructor(givenNames: string, familyName: string, amlAddress: any, ssn?: string) {
    this.setGivenNames(givenNames);
    this.setFamilyName(familyName);
    this.setAmlAddress(amlAddress);
    if (typeof ssn !== 'undefined') {
      this.setSsn(ssn);
    }
  }

  /**
   * @param givenNames
   */
  setGivenNames(givenNames: string) {
    this.givenNames = givenNames;
  }

  /**
   * @returns {*}
   */
  getGivenNames() {
    return this.givenNames;
  }

  /**
   * @param familyName
   */
  setFamilyName(familyName: string) {
    this.familyName = familyName;
  }

  /**
   * @returns familyName
   */
  getFamilyName() {
    return this.familyName;
  }

  /**
   * @param amlAddress
   */
  setAmlAddress(amlAddress: any) {
    AmlProfile.validateAmlAddress(amlAddress);
    this.amlAddress = amlAddress;
  }

  /**
   * @returns amlAddress
   */
  getAmlAddress() {
    return this.amlAddress;
  }

  /**
   * @param ssn
   */
  setSsn(ssn: string) {
    this.ssn = ssn;
  }

  /**
   * @returns ssn
   */
  getSsn() {
    return this.ssn;
  }

  /**
   * Check if amlAddress is an object.
   *
   * @param amlAddress
   */
  static validateAmlAddress(amlAddress) {
    if (!amlAddress) {
      throw new Error('AmlAddress should be an object of Type/AmlAddress');
    }
  }

  /**
   * Get profile data.
   *
   * @returns {{}}
   */
  getData() {
    const data = {};
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
  toString() {
    return JSON.stringify(this.getData());
  }
};
