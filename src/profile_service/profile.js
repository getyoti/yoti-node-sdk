'use strict';

const constants = require('../yoti_common/constants');
const { BaseProfile } = require('./base.profile');
const { Attribute } = require('../data_type/attribute');
const { AgeVerification } = require('../data_type/age.verification');
const Validation = require('../yoti_common/validation');

/**
 * Profile of a human user with convenience methods to access well-known attributes.
 *
 * @class Profile
 */
class Profile extends BaseProfile {
  /**
   * The full name attribute.
   *
   * @returns {null|Attribute}
   */
  getFullName() {
    return this.getAttribute(constants.ATTR_FULL_NAME);
  }

  /**
   * Corresponds to secondary names in passport, and first/middle names in English.
   *
   * @returns {null|Attribute}
   */
  getGivenNames() {
    return this.getAttribute(constants.ATTR_GIVEN_NAMES);
  }

  /**
   * Corresponds to primary name in passport, and surname in English.
   *
   * @returns {null|Attribute}
   */
  getFamilyName() {
    return this.getAttribute(constants.ATTR_FAMILY_NAME);
  }

  /**
   * Date of birth.
   *
   * @returns {null|Attribute}
   */
  getDateOfBirth() {
    return this.getAttribute(constants.ATTR_DATE_OF_BIRTH);
  }

  /**
   * Did the user pass the age verification check?
   *
   * @deprecated use getAgeVerifications(), findAgeOverVerification(age)
   * or findAgeUnderVerification(age)
   *
   * @returns {null|Attribute}
   */
  getAgeVerified() {
    return this.getAttribute(constants.ATTR_AGE_VERIFIED);
  }

  /**
   * Finds all the 'Age Over' and 'Age Under' derived attributes returned with the profile,
   * and returns them wrapped in AgeVerification objects
   *
   * @returns {Array}
   */
  getAgeVerifications() {
    this.findAllAgeVerifications();
    return Object.keys(this.ageVerifications)
      .map((key) => this.ageVerifications[key]);
  }

  /**
   * Searches for an AgeVerification corresponding to an 'Age Over' check for the given age
   *
   * @param {int} age
   *
   * @returns {AgeVerification|null}
   */
  findAgeOverVerification(age) {
    return this.findAgeVerification(constants.ATTR_AGE_OVER, age);
  }

  /**
   * Searches for an AgeVerification corresponding to an 'Age Under' check for the given age.
   *
   * @param {int} age
   *
   * @returns {AgeVerification|null}
   */
  findAgeUnderVerification(age) {
    return this.findAgeVerification(constants.ATTR_AGE_UNDER, age);
  }

  /**
   * Searches for an AgeVerification corresponding to provided type and age.
   *
   * @param {string} type
   * @param {int} age
   *
   * @returns {AgeVerification|null}
   */
  findAgeVerification(type, age) {
    Validation.isString(type);
    Validation.isInteger(age);
    this.findAllAgeVerifications();
    return this.ageVerifications[type + age] || null;
  }

  /**
   * Find all age verifications and put in key value object.
   */
  findAllAgeVerifications() {
    if (this.ageVerifications) {
      return;
    }
    this.ageVerifications = {};
    this.findAttributesStartingWith(constants.ATTR_AGE_OVER).forEach((attribute) => {
      this.ageVerifications[attribute.getName()] = new AgeVerification(attribute);
    });
    this.findAttributesStartingWith(constants.ATTR_AGE_UNDER).forEach((attribute) => {
      this.ageVerifications[attribute.getName()] = new AgeVerification(attribute);
    });
  }

  /**
   * Corresponds to the gender in the passport; will be one of the strings
   * "MALE", "FEMALE", "TRANSGENDER" or "OTHER".
   *
   * @returns {null|Attribute}
   */
  getGender() {
    return this.getAttribute(constants.ATTR_GENDER);
  }

  /**
   * Corresponds to the nationality in the passport.
   *
   * @returns {Attribute|main}
   */
  getNationality() {
    return this.getAttribute(constants.ATTR_NATIONALITY);
  }

  /**
   * The user's phone number, as verified at registration time. This will be a number with + for
   * international prefix and no spaces, e.g. "+447777123456".
   *
   * @returns {null|Attribute}
   */
  getPhoneNumber() {
    return this.getAttribute(constants.ATTR_PHONE_NUMBER);
  }

  /**
   * Photograph of user, encoded as a JPEG image.
   *
   * @returns {Attribute|main}
   */
  getSelfie() {
    return this.getAttribute(constants.ATTR_SELFIE);
  }

  /**
   * The user's verified email address.
   *
   * @returns {null|Attribute}
   */
  getEmailAddress() {
    return this.getAttribute(constants.ATTR_EMAIL_ADDRESS);
  }

  /**
   * The user's postal address as a String.
   *
   * @returns {null|Attribute}
   */
  getPostalAddress() {
    // Return postal address if available.
    const postalAddress = this.getAttribute(constants.ATTR_POSTAL_ADDRESS);
    if (postalAddress !== null) {
      return postalAddress;
    }

    // Return formatted address if postal address is null.
    if (this.propertyExists(constants.ATTR_STRUCTURED_POSTAL_ADDRESS)) {
      const structuredAddrObj = this.profileData[constants.ATTR_STRUCTURED_POSTAL_ADDRESS];
      if (structuredAddrObj instanceof Object) {
        const formattedAddrObj = Object.assign({}, structuredAddrObj);
        formattedAddrObj.name = constants.ATTR_POSTAL_ADDRESS;
        formattedAddrObj.value = structuredAddrObj.value.formatted_address;
        return new Attribute(formattedAddrObj);
      }
    }

    return null;
  }

  /**
   * The user's structured postal address as a Json.
   *
   * @returns {null|*}
   */
  getStructuredPostalAddress() {
    return this.getAttribute(constants.ATTR_STRUCTURED_POSTAL_ADDRESS);
  }

  /**
   * Document details.
   *
   * @returns {null|DocumentDetails}
   */
  getDocumentDetails() {
    return this.getAttribute(constants.ATTR_DOCUMENT_DETAILS);
  }

  /**
   * Document images.
   *
   * @returns {null|Attribute}
   */
  getDocumentImages() {
    return this.getAttribute(constants.ATTR_DOCUMENT_IMAGES);
  }
}

module.exports = {
  Profile,
};
