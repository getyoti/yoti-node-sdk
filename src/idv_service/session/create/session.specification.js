'use strict';

const Validation = require('../../../yoti_common/validation');
const NotificationConfig = require('./notification.config');
const SdkConfig = require('./sdk.config');
const RequestedTask = require('./task/requested.task');
const RequestedCheck = require('./check/requested.check');
const RequiredDocument = require('./filters/required.document');
const AdvancedIdentityProfileRequirements = require('./identity_profile/advanced/advanced.identity.profile.requirements');

/**
 * Definition for the IDV Session to be created
 *
 * @class SessionSpecification
 */
class SessionSpecification {
  /**
   * @param {number} clientSessionTokenTtl
   *   Client-session-token time-to-live to apply to the created session
   * @param {number} resourcesTtl
   *   Time-to-live used for all Resources created in the course of the session
   * @param {string} userTrackingId
   *   User tracking id, for the Relying Business to track returning users
   * @param {NotificationConfig} notifications
   *   For configuring call-back messages
   * @param {RequestedCheck[]} requestedChecks
   *   The Checks to be performed on each Document
   * @param {RequestedTask[]} requestedTasks
   *   The Tasks to be performed on each Document
   * @param {SdkConfig} sdkConfig
   *   The SDK configuration set on the session specification
   * @param {RequiredDocument[]} requiredDocuments
   *   List of RequiredDocument defining the documents required from the client
   * @param {boolean} blockBiometricConsent
   *   Sets whether or not to block the collection of biometric consent
   * @param {Date} sessionDeadline
   *   The deadline that the session needs to be completed by
   * @param {object} [identityProfileRequirements]
   * @param {object} [subject]
   *   Information about the subject of the session
   * @param {AdvancedIdentityProfileRequirements} [advancedIdentityProfileRequirements]
   */
  constructor(
    clientSessionTokenTtl,
    resourcesTtl,
    userTrackingId,
    notifications,
    requestedChecks,
    requestedTasks,
    sdkConfig,
    requiredDocuments,
    blockBiometricConsent,
    sessionDeadline,
    identityProfileRequirements,
    subject,
    advancedIdentityProfileRequirements
  ) {
    Validation.isInteger(clientSessionTokenTtl, 'clientSessionTokenTtl', true);
    /** @private */
    this.clientSessionTokenTtl = clientSessionTokenTtl;

    if (sessionDeadline) {
      Validation.instanceOf(sessionDeadline, Date, 'sessionDeadline');
      /** @private */
      this.sessionDeadline = sessionDeadline;
    }

    Validation.isInteger(resourcesTtl, 'resourcesTtl', true);
    /** @private */
    this.resourcesTtl = resourcesTtl;

    Validation.isString(userTrackingId, 'userTrackingId', true);
    /** @private */
    this.userTrackingId = userTrackingId;

    if (notifications) {
      Validation.instanceOf(notifications, NotificationConfig, 'notifications');
      /** @private */
      this.notifications = notifications;
    }

    if (sdkConfig) {
      Validation.instanceOf(sdkConfig, SdkConfig, 'sdkConfig');
      /** @private */
      this.sdkConfig = sdkConfig;
    }

    if (identityProfileRequirements) {
      Validation.isPlainObject(identityProfileRequirements, 'identityProfileRequirements');
      /** @private */
      this.identityProfileRequirements = identityProfileRequirements;
    }

    if (advancedIdentityProfileRequirements) {
      Validation.instanceOf(advancedIdentityProfileRequirements, AdvancedIdentityProfileRequirements, 'advancedIdentityProfileRequirements');
      /** @private */
      this.advancedIdentityProfileRequirements = advancedIdentityProfileRequirements;
    }

    if (subject) {
      Validation.isPlainObject(subject, 'subject');
      /** @private */
      this.subject = subject;
    }

    Validation.isArrayOfType(requestedChecks, RequestedCheck, 'requestedChecks');
    /** @private */
    this.requestedChecks = requestedChecks;

    Validation.isArrayOfType(requestedTasks, RequestedTask, 'requestedTasks');
    /** @private */
    this.requestedTasks = requestedTasks;

    if (requiredDocuments) {
      Validation.isArrayOfType(requiredDocuments, RequiredDocument, 'requiredDocuments');
      /** @private */
      this.requiredDocuments = requiredDocuments;
    }

    Validation.isBoolean(blockBiometricConsent, 'blockBiometricConsent', true);
    /** @private */
    this.blockBiometricConsent = blockBiometricConsent;
  }

  /**
   * Returns serialized data for JSON.stringify()
   */
  toJSON() {
    return {
      client_session_token_ttl: this.clientSessionTokenTtl,
      session_deadline: this.sessionDeadline && this.sessionDeadline.toISOString(),
      resources_ttl: this.resourcesTtl,
      user_tracking_id: this.userTrackingId,
      notifications: this.notifications,
      requested_checks: this.requestedChecks,
      requested_tasks: this.requestedTasks,
      sdk_config: this.sdkConfig,
      required_documents: this.requiredDocuments,
      block_biometric_consent: this.blockBiometricConsent,
      identity_profile_requirements: this.identityProfileRequirements,
      subject: this.subject,
      advanced_identity_profile_requirements: this.advancedIdentityProfileRequirements,
    };
  }
}

module.exports = SessionSpecification;
