'use strict';

const constants = require('../../yoti_common/constants');
const BaseProfile = require('./base.profile');
const { AgeVerification } = require('../../data_type/age.verification');
const { Attribute } = require('../../data_type/attribute');
const Validation = require('../../yoti_common/validation');

/**
 * Profile of a human user with convenience methods to access well-known attributes.
 *
 * @class Profile
 */
class UserProfile extends BaseProfile {
  constructor(attributes = []) {
    super(attributes);

    /** @private */
    this.ageVerifications = this.attributes
      .filter((attribute) => attribute.getValue() instanceof AgeVerification)
      .reduce((acc, attribute) => ({
        ...acc,
        [attribute.getName()]: attribute,
      }), {});
  }

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
   * Finds all the 'Age Over' and 'Age Under' derived attributes returned with the profile,
   * and returns them wrapped in AgeVerification objects
   *
   * @returns {Array}
   */
  getAgeVerifications() {
    return Object.values(this.ageVerifications);
  }

  /**
   * Searches for an AgeVerification corresponding to an 'Age Over' check for the given age
   *
   * @param {number} age
   *
   * @returns {AgeVerification|null}
   */
  findAgeOverVerification(age) {
    return this.findAgeVerification(constants.ATTR_AGE_OVER, age);
  }

  /**
   * Searches for an AgeVerification corresponding to an 'Age Under' check for the given age.
   *
   * @param {number} age
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
   * @param {number} age
   *
   * @returns {AgeVerification|null}
   */
  findAgeVerification(type, age) {
    Validation.isString(type, 'type');
    Validation.isInteger(age, 'age');
    return this.ageVerifications[type + age] || null;
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
   * @returns {Attribute|null}
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
   * @returns {Attribute|null}
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

    const structuredPostalAddress = this.getStructuredPostalAddress();
    if (structuredPostalAddress) {
      return new Attribute({
        ...structuredPostalAddress,
        name: constants.ATTR_POSTAL_ADDRESS,
        value: structuredPostalAddress.getValue().formatted_address,
      });
    }

    return null;
  }

  /**
   * The user's structured postal address as a Json.
   *
   * @returns {null|Attribute}
   */
  getStructuredPostalAddress() {
    return this.getAttribute(constants.ATTR_STRUCTURED_POSTAL_ADDRESS);
  }

  /**
   * Document details.
   *
   * @returns {null|Attribute}
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

  /**
   * Identity Profile Report.
   *
   * @returns {null|Attribute}
   */
  getIdentityProfileReport() {
    return this.getAttribute(constants.ATTR_IDENTITY_PROFILE_REPORT);
  }
}

module.exports = UserProfile;
