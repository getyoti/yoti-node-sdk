'use strict';

const UserContent = require('./receipts/user.content');
const ApplicationContent = require('./receipts/application.content');
const Validation = require('../yoti_common/validation');

/**
 * Receipt of a Digital Identity Share.
 *
 * @class GetShareReceiptResult
 */
module.exports = class GetShareReceiptResult {
  /**
   * @param {import ('./receipts/receipt.response')} receiptResponse
   *   Parsed ReceiptResponse.
   * @param {UserContent} userContent
   *   The user content, including profile and extra data
   * @param {ApplicationContent} applicationContent
   *  The application content, including profile and extra data
   */
  constructor(
    receiptResponse,
    userContent = new UserContent(),
    applicationContent = new ApplicationContent()
  ) {
    /** @private */
    this.sessionId = receiptResponse.getSessionId();
    /** @private */
    this.rememberMeId = receiptResponse.getRememberMeId();
    /** @private */
    this.parentRememberMeId = receiptResponse.getParentRememberMeId();
    /** @private */
    this.timestamp = receiptResponse.getTimestamp();
    /** @private */
    this.error = receiptResponse.getError();
    /** @private */
    this.errorReason = receiptResponse.getErrorReason();
    /** @private */
    this.id = receiptResponse.getId();

    if (userContent) Validation.instanceOf(userContent, UserContent, 'userContent');
    if (applicationContent) Validation.instanceOf(applicationContent, ApplicationContent, 'applicationContent');

    /** @private */
    this.userContent = userContent;
    /** @private */
    this.applicationContent = applicationContent;
  }

  /**
   * Returns the ID of the Session that the receipt belongs to.
   *
   * @returns {string}
   */
  getSessionId() {
    return this.sessionId;
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
    return this.rememberMeId;
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
    return this.parentRememberMeId;
  }

  /**
   * Receipt ID identifying a completed activity.
   *
   * @returns {string}
   */
  getReceiptId() {
    return this.id;
  }

  /**
   * Time and date of the sharing activity
   *
   * @returns {Date}
   */
  getTimestamp() {
    return new Date(this.timestamp);
  }

  /**
   * The user profile with shared attributes and anchor information, returned
   * by Yoti if the request was successful.
   *
   * @returns {import('./receipts/user.profile')}
   */
  getProfile() {
    return this.userContent && this.userContent.getProfile();
  }

  /**
   * Extra data associated with the user content
   *
   * @typedef {import('./receipts/extra.data')} ExtraData
   * @returns {ExtraData}
   */
  getExtraData() {
    return this.userContent && this.userContent.getExtraData();
  }

  /**
   * The user content (profile + extraData)
   *
   * @returns {UserContent}
   */
  getUserContent() {
    return this.userContent;
  }

  /**
   * The application content (profile + extraData)
   *
   * @returns {ApplicationContent}
   */
  getApplicationContent() {
    return this.applicationContent;
  }

  /**
   * Error code of receipt
   *
   * @returns {string}
   */
  getError() {
    return this.error;
  }

  getErrorReason() {
    return this.errorReason;
  }
};
