'use strict';

const constants = require('../yoti_common/constants');

const Attribute = function main(attrObj) {
  this.value = attrObj.value;
  this.name = attrObj.orig_name;
  this.sources = attrObj.sources;
  this.verifiers = attrObj.verifiers;
};

Attribute.prototype = {
  getValue() { return this.value; },
  getName() { return this.name; },
  getSources() { return this.sources; },
  getVerifiers() { return this.verifiers; },
};

module.exports.Profile = class Profile {
  constructor(profileData) {
    this.givenNames = null;
    this.familyName = null;
    this.fullName = null;
    this.postalAddress = null;
    this.gender = null;
    this.emailAddress = null;
    this.phoneNumber = null;
    this.phoneNumber = null;
    this.dateOfBirth = null;
    this.postalAddress = null;
    this.structuredPostalAddress = null;

    this.profileData = Object.assign({}, profileData);

    Object.keys(this.profileData).forEach(function(key) {
      this.initiateAttribute(key, this.profileData[key]);
    }, this);
  }

  /**
   *
   * @param fullName
   */
  setFullName(fullName) {
    if (fullName.orig_name === constants.ATTR_FULL_NAME) {
      this.fullName = new Attribute(fullName);
    }
  }

  /**
   *
   * @returns {null|Attribute}
   */
  getFullName() {
    return this.fullName;
  }

  /**
   * @param givenNames
   */
  setGivenNames(givenNames) {
    if (givenNames.orig_name === constants.ATTR_GIVEN_NAMES) {
      this.givenNames = new Attribute(givenNames);
    }
  }

  /**
   * @returns {null|Attribute}
   */
  getGivenNames() {
    return this.givenNames;
  }

  /**
   * @param familyName
   */
  setFamilyName(familyName) {
    if (familyName.orig_name === constants.ATTR_FAMILY_NAME) {
      this.familyName = new Attribute(familyName);
    }
  }

  /**
   * @returns {null|Attribute}
   */
  getFamilyName() {
    return this.familyName;
  }

  /**
   * @param dateOfBirth
   */
  setDateOfBirth(dateOfBirth) {
    if (dateOfBirth.orig_name === constants.ATTR_DATE_OF_BIRTH) {
      this.dateOfBirth = new Attribute(dateOfBirth);
    }
  }

  /**
   * @returns {null|Attribute}
   */
  getDateOfBirth() {
    return this.dateOfBirth;
  }

  /**
   * @param gender
   */
  setGender(gender) {
    if (gender.orig_name === constants.ATTR_GENDER) {
      this.gender = new Attribute(gender);
    }
  }

  /**
   * @returns {null|Attribute}
   */
  getGender() {
    return this.gender;
  }

  /**
   * @param nationality
   */
  setNationality(nationality) {
    if (nationality.orig_name === constants.ATTR_NATIONALITY) {
      this.nationality = new Attribute(nationality);
    }
  }

  /**
   * @returns {Attribute|main}
   */
  getNationality() {
    return this.nationality;
  }

  /**
   * @param phoneNumber
   */
  setPhoneNumber(phoneNumber) {
    if (phoneNumber.orig_name === constants.ATTR_PHONE_NUMBER) {
      this.phoneNumber = new Attribute(phoneNumber);
    }
  }

  /**
   * @returns {null|Attribute}
   */
  getPhoneNumber() {
    return this.phoneNumber;
  }

  /**
   * @param selfie
   */
  setSelfie(selfie) {
    if(selfie.orig_name === constants.ATTR_SELFIE) {
      this.selfie = new Attribute(selfie);
    }
  }

  /**
   * @returns {Attribute|main}
   */
  getSelfie() {
    return this.selfie;
  }

  /**
   * @param emailAddress
   */
  setEmailAddress(emailAddress) {
    if (emailAddress.orig_name === constants.ATTR_EMAIL_ADDRESS) {
      this.emailAddress = new Attribute(emailAddress);
    }
  }

  /**
   * @returns {null|Attribute}
   */
  getEmailAddress() {
    return this.emailAddress;
  }

  /**
   * @param postalAddress
   */
  setPostalAddress(postalAddress) {
    if (postalAddress.orig_name === constants.ATTR_POSTAL_ADDRESS) {
      this.postalAddress = new Attribute(postalAddress);
    }
  }

  /**
   * @returns {null|Attribute}
   */
  getPostalAddress() {
    return this.postalAddress;
  }

  /**
   * @param structuredPostalAddress
   */
  setStructuredPostalAddress(structuredPostalAddress) {
    if (structuredPostalAddress.orig_name === constants.ATTR_STRUCTURED_POSTAL_ADDRESS) {
      this.structuredPostalAddress = structuredPostalAddress;
    }
  }

  /**
   * @returns {null|*}
   */
  getStructuredPostalAddress() {
    return this.structuredPostalAddress;
  }

  /**
   * Set profile attribute.
   *
   * @param AttrName
   * @param params
   */
  initiateAttribute(AttrName, params) {
    //let args = Object.assign(params, {'name': AttrName});
    let AttrFunc = 'set' + AttrName[0].toUpperCase() + AttrName.slice(1);
    this[AttrFunc].call(this, params);
  }

  /**
   * Returns a string representing the object.
   *
   * @returns {string}
   */
  toString() {
    return JSON.stringify(this.profileData);
  }
};
