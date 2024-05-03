'use strict';

const Validation = require('../../yoti_common/validation');

/**
 * @typedef {Object} RequirementsNotMetDetail
 * @property {string} [failureType]
 * @property {string} [documentType]
 * @property {string} [documentCountryIsoCode]
 * @property {string} [auditId]
 * @property {string} [details]
 */

/**
 * @returns {RequirementsNotMetDetail}
 */
function parseRequirementsNotMetDetail(rawDetail) {
  const {
    failure_type: failureType,
    document_type: documentType,
    document_country_iso_code: documentCountryIsoCode,
    audit_id: auditId,
    details,
  } = rawDetail;

  return {
    failureType,
    documentType,
    documentCountryIsoCode,
    auditId,
    details,
  };
}

/**
 * The receipt response
 *
 * @class ReceiptResponse
 */
class ReceiptResponse {
  constructor(response) {
    Validation.isString(response.id, 'Receipt ID');
    /** @private */
    this.id = response.id;

    Validation.isString(response.sessionId, 'Session ID');
    /** @private */
    this.sessionId = response.sessionId;

    Validation.isStringDate(response.timestamp, 'timestamp');
    /** @private */
    this.timestamp = new Date(response.timestamp);

    if (response.error) {
      /** @private */
      this.error = response.error;
    }

    if (response.errorReason) {
      /** @private */
      this.errorReason = response.errorReason;

      const { requirements_not_met_details: rawRequirementsNotMetDetails } = response.errorReason;
      if (Array.isArray(rawRequirementsNotMetDetails)) {
        // eslint-disable-next-line max-len
        this.errorReason.requirementsNotMetDetails = rawRequirementsNotMetDetails.map(parseRequirementsNotMetDetail);
        delete this.errorReason.requirements_not_met_details;
      }
    }

    if (response.rememberMeId) {
      Validation.isString(response.rememberMeId, 'Remember Me Id');
      /** @private */
      this.rememberMeId = response.rememberMeId;
    }

    if (response.parentRememberMeId) {
      Validation.isString(response.parentRememberMeId, 'Parent Remember Me Id');
      /** @private */
      this.parentRememberMeId = response.parentRememberMeId;
    }

    if (response.content) {
      Validation.isPlainObject(response.content, 'Content');
      /** @private */
      this.content = response.content;
    }

    if (response.otherPartyContent) {
      Validation.isPlainObject(response.otherPartyContent, 'Other Party Content');
      /** @private */
      this.otherPartyContent = response.otherPartyContent;
    }

    if (response.wrappedItemKeyId) {
      Validation.isString(response.wrappedItemKeyId, 'Wrapped Item Key Id');
      /** @private */
      this.wrappedItemKeyId = response.wrappedItemKeyId;
    }

    if (response.wrappedKey) {
      Validation.isString(response.wrappedKey, 'Wrapped Key');
      /** @private */
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

  /**
   * @typedef {Object} ErrorReason
   * @property {RequirementsNotMetDetail[]} [requirementsNotMetDetails]
   *
   * The error reason of the receipt
   *
   * @returns {ErrorReason|undefined}
   */
  getErrorReason() {
    return this.errorReason;
  }
}

module.exports = ReceiptResponse;
