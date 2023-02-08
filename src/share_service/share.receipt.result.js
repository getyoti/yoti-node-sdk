'use strict';

const Validation = require('../yoti_common/validation');

/**
 * The share receipt result
 *
 * @class ShareReceiptResult
 */
module.exports = class ShareReceiptResult {
  /**
   * @param {Object} response
   */
  constructor(response) {
    Validation.isString(response.id, 'Receipt ID');
    this.id = response.id;

    Validation.isString(response.sessionId, 'Session Id');
    this.sessionId = response.sessionId;

    // Validation.isString(response.timestamp, 'timestamp');
    const timestamp = new Date(response.timestamp);
    if (timestamp.toString() === 'Invalid Timestamp') throw TypeError('timestamp must be a date like string');
    this.timestamp = timestamp;

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
   * The receipt id
   *
   * @returns {string} The receipt id
   */
  getId() {
    return this.id;
  }

  /**
   * The session id
   *
   * @returns {string} The session id
   */
  getSessionId() {
    return this.sessionId;
  }

  /**
   * The timestamp
   *
   * @returns {string} The timestamp
   */
  getTimestamp() {
    return this.timestamp;
  }

  /**
   * The Remember Me id
   *
   * @returns {string} The Remember Me id
   */
  getRememberMeId() {
    return this.rememberMeId;
  }

  /**
   * The Parent Remember Me id
   *
   * @returns {string} The Parent Remember Me id
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
};
