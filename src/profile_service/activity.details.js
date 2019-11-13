'use strict';

const { Age } = require('../yoti_common/age');
const { Profile } = require('./profile');
const { ApplicationProfile } = require('./application.profile');
const ExtraData = require('./extra.data');
const Validation = require('../yoti_common/validation');

/**
 * Processes profile array data into object.
 *
 * @param {array} profile
 * @returns {object}
 */
function parseProfile(profile) {
  if (!profile) {
    return {};
  }
  return profile.reduce((acc, current) => {
    const propName = Object.getOwnPropertyNames(current)[0];
    acc[propName] = current[propName];
    return acc;
  }, {});
}

/**
 * Details of an activity between a user and the application.
 *
 * @class ActivityDetails
 */
class ActivityDetails {
  /**
   * @param {object} parsedResponse
   *   Parsed JSON response.
   * @param {array} decryptedProfile
   *   Decrypted user profile data.
   * @param {array} decryptedApplicationProfile
   *   Decrypted application profile data.
   * @param {ExtraData} extraData
   *   Decrypted and converted extra data.
   */
  constructor(parsedResponse, decryptedProfile, decryptedApplicationProfile, extraData) {
    this.parsedResponse = parsedResponse;
    this.decryptedProfile = decryptedProfile;
    this.receipt = parsedResponse.receipt;
    this.profile = parseProfile(decryptedProfile);

    if (extraData !== undefined) {
      Validation.instanceOf(extraData, ExtraData, 'extraData');
    }
    this.extraData = extraData;

    // This is the new profile attribute
    this.extendedProfile = new Profile(this.profile.extendedProfile);
    delete this.profile.extendedProfile;

    const applicationProfile = parseProfile(decryptedApplicationProfile);
    this.applicationProfile = new ApplicationProfile(applicationProfile.extendedProfile);

    const age = new Age(this.profile);
    if (age.isVerified() !== null) {
      this.profile.isAgeVerified = age.isVerified();
    }
  }

  /**
   * Return the Remember Me ID.
   *
   * @deprecated Replaced by getRememberMeId()
   */
  getUserId() {
    return this.getRememberMeId();
  }

  /**
   * Return the Remember Me ID, which is a unique, stable identifier for
   * a user in the context of an application.
   *
   * You can use it to identify returning users. This value will be different
   * for the same user in different applications.
   *
   * @returns {string}
   */
  getRememberMeId() {
    return this.receipt.remember_me_id;
  }

  /**
   * Return the Parent Remember Me ID, which is a unique, stable identifier for a
   * user in the context of an organisation.
   *
   * You can use it to identify returning users. This value is consistent for a
   * given user across different applications belonging to a single organisation.
   *
   * @returns {string}
   */
  getParentRememberMeId() {
    return this.receipt.parent_remember_me_id;
  }

  /**
   * The user profile returned by Yoti if the request was successful.
   *
   * @deprecated replaced by getProfile()
   *
   * @returns {Object}
   */
  getUserProfile() {
    return this.profile;
  }

  /**
   * The user profile with shared attributes and anchor information, returned
   * by Yoti if the request was successful.
   *
   * @returns {Profile}
   */
  getProfile() {
    return this.extendedProfile;
  }

  /**
   * Profile of an application, with convenience methods to access well-known attributes.
   *
   * @returns {ApplicationProfile}
   */
  getApplicationProfile() {
    return this.applicationProfile;
  }

  /**
   * A enum to represent the success state when requesting a profile.
   *
   * @returns {string}
   */
  getOutcome() {
    return this.receipt.sharing_outcome;
  }

  /**
   * Base64 encoded selfie image.
   *
   * @returns {string}
   */
  getBase64SelfieUri() {
    return this.profile.base64SelfieUri;
  }

  /**
   * Receipt ID identifying a completed activity.
   *
   * @returns {string}
   */
  getReceiptId() {
    return this.receipt.receipt_id;
  }

  /**
   * Time and date of the sharing activity
   *
   * @returns {Date}
   */
  getTimestamp() {
    return new Date(this.receipt.timestamp);
  }

  /**
   * Extra data associated with the receipt
   *
   * @returns {ExtraData}
   */
  getExtraData() {
    return this.extraData;
  }
}

module.exports = {
  ActivityDetails,
};
