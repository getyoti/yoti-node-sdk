'use strict';

const Validation = require('../../yoti_common/validation');

/**
 * The receipt response
 *
 * @class ReceiptResponse
 */
class ReceiptResponse {
  constructor(response) {
    Validation.isString(response.id, 'Receipt ID');
    this.id = response.id;

    Validation.isString(response.sessionId, 'Session ID');
    this.sessionId = response.sessionId;

    Validation.isStringDate(response.timestamp, 'timestamp');
    this.timestamp = new Date(response.timestamp);

    if (response.error) {
      this.error = response.error;
    }

    if (response.rememberMeId) {
      Validation.isString(response.rememberMeId, 'Remember Me Id');
      this.rememberMeId = response.rememberMeId;
    }

    if (response.parentRememberMeId) {
      Validation.isString(response.parentRememberMeId, 'Parent Remember Me Id');
      this.parentRememberMeId = response.parentRememberMeId;
    }

    if (response.content) {
      Validation.isPlainObject(response.content, 'Content');
      this.content = response.content;
    }

    if (response.otherPartyContent) {
      Validation.isPlainObject(response.otherPartyContent, 'Other Party Content');
      this.otherPartyContent = response.otherPartyContent;
    }

    if (response.wrappedItemKeyId) {
      Validation.isString(response.wrappedItemKeyId, 'Wrapped Item Key Id');
      this.wrappedItemKeyId = response.wrappedItemKeyId;
    }

    if (response.wrappedKey) {
      Validation.isString(response.wrappedKey, 'Wrapped Key');
      this.wrappedKey = response.wrappedKey;
    }
  }

  /**
   * The receipt ID
   *
   * @returns {string} The receipt ID
   */
  getId() {
    return this.id;
  }

  /**
   * The session ID
   *
   * @returns {string} The session ID
   */
  getSessionId() {
    return this.sessionId;
  }

  /**
   * The timestamp
   *
   * @returns {Date} The timestamp
   */
  getTimestamp() {
    return this.timestamp;
  }

  /**
   * The Remember Me ID
   *
   * @returns {string} The Remember Me ID
   */
  getRememberMeId() {
    return this.rememberMeId;
  }

  /**
   * The Parent Remember Me ID
   *
   * @returns {string} The Parent Remember Me ID
   */
  getParentRememberMeId() {
    return this.parentRememberMeId;
  }

  /**
   * The content
   *
   * @returns {Object} The content
   */
  getContent() {
    return this.content;
  }

  /**
   * The otherPartyContent
   *
   * @returns {Object} The otherPartyContent
   */
  getOtherPartyContent() {
    return this.otherPartyContent;
  }

  /**
   * The wrappedItemKeyId
   *
   * @returns {string} The wrappedItemKeyId
   */
  getWrappedItemKeyId() {
    return this.wrappedItemKeyId;
  }

  /**
   * The wrappedKey
   *
   * @returns {string} The wrappedKey
   */
  getWrappedKey() {
    return this.wrappedKey;
  }

  /**
   * The error of the receipt
   *
   * @returns {string} The error of the receipt
   */
  getError() {
    return this.error;
  }
}

module.exports = ReceiptResponse;
