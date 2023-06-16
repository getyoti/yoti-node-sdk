'use strict';

const { Profile } = require('./profile');
const { ApplicationProfile } = require('./application.profile');
const ExtraData = require('./extra.data');

/**
 * Details of an activity between a user and the application.
 *
 * @class ActivityDetails
 */
class ActivityDetails {
  /**
   * @param {object} parsedResponse
   *   Parsed JSON response.
   * @param {{attributes: Object[]}} userProfile
   *   Decrypted user profile data.
   * @param {{attributes: Object[]}} applicationProfile
   *   Decrypted application profile data.
   * @param {[]} extraData
   *   Decrypted and converted extra data.
   */
  constructor(parsedResponse, userProfile, applicationProfile, extraData) {
    this.parsedResponse = parsedResponse;
    this.receipt = parsedResponse.receipt;

    const { attributes: userProfileAttributes } = userProfile || {};
    const { attributes: applicationProfileAttributes } = applicationProfile || {};
    this.userProfile = new Profile(userProfileAttributes);
    this.applicationProfile = new ApplicationProfile(applicationProfileAttributes);
    this.extraData = new ExtraData(extraData);
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
   * The user profile with shared attributes and anchor information, returned
   * by Yoti if the request was successful.
   *
   * @returns {Profile}
   */
  getProfile() {
    return this.userProfile;
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
   * An enum to represent the success state when requesting a profile.
   *
   * @returns {string}
   */
  getOutcome() {
    return this.receipt.sharing_outcome;
  }

  getErrorDetails() {
    // eslint-disable-next-line camelcase
    const responseErrorDetails = this.parsedResponse.error_details;
    let errorDetails;
    if (responseErrorDetails) {
      errorDetails = {
        errorCode: responseErrorDetails.error_code,
        description: responseErrorDetails.description,
      };
    }
    return errorDetails;
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
