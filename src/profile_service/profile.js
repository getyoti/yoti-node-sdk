'use strict';

const constants = require('../yoti_common/constants');
const { BaseProfile } = require('./base.profile');

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
   * @returns {null|Attribute}
   */
  getAgeVerified() {
    return this.getAttribute(constants.ATTR_AGE_VERIFIED);
  }

  /**
   * Corresponds to the gender in the passport; will be one of the strings "MALE", "FEMALE"
   * or "OTHER".
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
    return this.getAttribute(constants.ATTR_POSTAL_ADDRESS);
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
