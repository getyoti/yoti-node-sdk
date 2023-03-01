'use strict';

const Profile = require('./profile');
const ExtraData = require('./extra.data');
const Validation = require('../../yoti_common/validation');

/**
 * Receipt of a Digital Identity Share.
 *
 * @class Receipt
 */
class Receipt {
  /**
   * @param {object} receipt
   *   Parsed receipt.
   * @param {{attributes: Object[]}} userProfile
   *   Decrypted user profile data.
   * @param {ExtraData} extraData
   *   Decrypted and converted extra data.
   */
  constructor(receipt, userProfile = { attributes: [] }, extraData = undefined) {
    this.receipt = receipt;

    const { attributes: userProfileAttributes } = userProfile;
    this.userProfile = new Profile(userProfileAttributes);

    if (extraData) {
      Validation.instanceOf(extraData, ExtraData, 'extraData');
      this.extraData = extraData;
    }
  }

  /**
   * Returns the ID of the Session that the receipt belongs to.
   *
   * @returns {string}
   */
  getSessionId() {
    return this.receipt.sessionId;
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
    return this.receipt.rememberMeId;
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
    return this.receipt.parentRememberMeId;
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
   * Receipt ID identifying a completed activity.
   *
   * @returns {string}
   */
  getReceiptId() {
    return this.receipt.id;
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

  /**
   * Error code of receipt
   *
   * @returns {string}
   */
  getError() {
    return this.receipt.error;
  }
}

module.exports = Receipt;
