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
    this.profileData = Object.assign({}, profileData);
  }

  /**
   * @returns {null|Attribute}
   */
  getFullName() {
    return this.getAttribute(constants.ATTR_FULL_NAME);
  }

  /**
   * @returns {null|Attribute}
   */
  getGivenNames() {
    return this.getAttribute(constants.ATTR_GIVEN_NAMES);
  }

  /**
   * @returns {null|Attribute}
   */
  getFamilyName() {
    return this.getAttribute(constants.ATTR_FAMILY_NAME);
  }

  /**
   * @returns {null|Attribute}
   */
  getDateOfBirth() {
    return this.getAttribute(constants.ATTR_DATE_OF_BIRTH);
  }

  /**
   * @returns {null|Attribute}
   */
  getAgeVerified() {
    return this.getAttribute(constants.ATTR_AGE_VERIFIED);
  }

  /**
   * @returns {null|Attribute}
   */
  getGender() {
    return this.getAttribute(constants.ATTR_GENDER);
  }

  /**
   * @returns {Attribute|main}
   */
  getNationality() {
    return this.getAttribute(constants.ATTR_NATIONALITY);
  }

  /**
   * @returns {null|Attribute}
   */
  getPhoneNumber() {
    return this.getAttribute(constants.ATTR_PHONE_NUMBER);
  }

  /**
   * @returns {Attribute|main}
   */
  getSelfie() {
    return this.getAttribute(constants.ATTR_SELFIE);
  }

  /**
   * @returns {null|Attribute}
   */
  getEmailAddress() {
    return this.getAttribute(constants.ATTR_EMAIL_ADDRESS);
  }

  /**
   * @returns {null|Attribute}
   */
  getPostalAddress() {
    return this.getAttribute(constants.ATTR_POSTAL_ADDRESS);
  }

  /**
   * @returns {null|*}
   */
  getStructuredPostalAddress() {
    return this.getAttribute(constants.ATTR_STRUCTURED_POSTAL_ADDRESS);
  }

  /**
   * Return Attribute object.
   *
   * @param attrName
   *
   * @returns {*}
   */
  getAttribute(attrName) {
    if (this.propertyExists(this.profileData, attrName)) {
      let attrObj = this.profileData[attrName];
      if (attrObj instanceof Object) {
        return new Attribute(attrObj)
      }
    }
    return null;
  }

  propertyExists(obj, prop) {
    if (prop && (obj instanceof Object)) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    }
    return false;
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
