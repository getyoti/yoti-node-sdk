'use strict';

const constants = require('../yoti_common/constants');
const { Attribute } = require('../data_type/attribute');

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
   * @returns {null|DocumentDetails}
   */
  getDocumentDetails() {
    return this.getAttribute(constants.ATTR_DOCUMENT_DETAILS);
  }

  /**
   * @returns {null|Attribute}
   */
  getDocumentImages() {
    return this.getAttribute(constants.ATTR_DOCUMENT_IMAGES);
  }

  /**
   * Return Attribute object.
   *
   * @param attrName
   *
   * @returns {*}
   */
  getAttribute(attrName) {
    if (this.propertyExists(attrName)) {
      const attrObj = this.profileData[attrName];
      if (attrObj instanceof Object) {
        return new Attribute(attrObj);
      }
    }
    return null;
  }

  propertyExists(prop) {
    if (prop && (this.profileData instanceof Object)) {
      return Object.prototype.hasOwnProperty.call(this.profileData, prop);
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
