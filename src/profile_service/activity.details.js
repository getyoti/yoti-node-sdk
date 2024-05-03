'use strict';

const { Profile } = require('./profile');
const { ApplicationProfile } = require('./application.profile');
const ExtraData = require('./extra.data');

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
function transformRequirementsNotMetDetail(rawDetail) {
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
   * @param {*[]} extraData
   *   Decrypted and converted extra data.
   */
  constructor(parsedResponse, userProfile, applicationProfile, extraData) {
    /** @private */
    this.parsedResponse = parsedResponse;
    /** @private */
    this.receipt = parsedResponse.receipt;

    const { attributes: userProfileAttributes } = userProfile || {};
    const { attributes: applicationProfileAttributes } = applicationProfile || {};
    /** @private */
    this.userProfile = new Profile(userProfileAttributes);
    /** @private */
    this.applicationProfile = new ApplicationProfile(applicationProfileAttributes);
    /** @private */
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

  /**
   * @typedef {Object} ErrorReason
   * @property {RequirementsNotMetDetail[]} [requirementsNotMetDetails]
   *
   * @typedef {Object} ErrorDetails
   * @property {string} errorCode
   * @property {string} description
   * @property {ErrorReason} [errorReason]
   *
   * @returns {ErrorDetails|undefined}
   */
  getErrorDetails() {
    // eslint-disable-next-line camelcase
    const { error_details: responseErrorDetails } = this.parsedResponse;

    let errorDetails;
    if (responseErrorDetails) {
      const {
        error_code: errorCode,
        description = '',
        error_reason: errorReason,
      } = responseErrorDetails;

      if (errorReason && errorReason.requirements_not_met_details) {
        errorReason.requirementsNotMetDetails = errorReason.requirements_not_met_details
          .map(transformRequirementsNotMetDetail);
        delete errorReason.requirements_not_met_details;
      }

      errorDetails = {
        errorCode,
        description,
        ...(errorReason && { errorReason }),
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
