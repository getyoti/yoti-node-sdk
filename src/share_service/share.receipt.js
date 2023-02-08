'use strict';

const ShareReceiptResult = require('./share.receipt.result');
const { Profile } = require('../profile_service/profile');
const { ApplicationProfile } = require('../profile_service/application.profile');

/**
 * The share receipt
 *
 * @class ShareReceipt
 */
module.exports = class ShareReceipt extends ShareReceiptResult {
  /**
     * @param {object} response
     *   Parsed JSON response.
     * @param {{attributes: Object[]}} userProfile
     *   Decrypted user profile data.
     * @param {{attributes: Object[]}} applicationProfile
     *   Decrypted application profile data.
     */
  constructor(response, userProfile, applicationProfile) {
    super(response);

    const { attributes: userProfileAttributes } = userProfile || {};
    const { attributes: applicationProfileAttributes } = applicationProfile || {};
    this.userProfile = new Profile(userProfileAttributes);
    this.applicationProfile = new ApplicationProfile(applicationProfileAttributes);
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
};
