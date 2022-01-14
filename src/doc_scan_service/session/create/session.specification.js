'use strict';

const Validation = require('../../../yoti_common/validation');
const NotificationConfig = require('./notification.config');
const SdkConfig = require('./sdk.config');
const RequestedTask = require('./task/requested.task');
const RequestedCheck = require('./check/requested.check');
const RequiredDocument = require('./filters/required.document');

/**
 * Definition for the Doc Scan Session to be created
 *
 * @class SessionSpecification
 */
class SessionSpecification {
  /**
   * @param {int} clientSessionTokenTtl
   *   Client-session-token time-to-live to apply to the created session
   * @param {int} resourcesTtl
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
   * @param {bool} blockBiometricConsent
   *   Sets whether or not to block the collection of biometric consent
   * @param {Date} sessionDeadline
   *   The deadline that the session needs to be completed by
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
    sessionDeadline
  ) {
    Validation.isInteger(clientSessionTokenTtl, 'clientSessionTokenTtl', true);
    this.clientSessionTokenTtl = clientSessionTokenTtl;

    if (sessionDeadline) {
      Validation.instanceOf(sessionDeadline, Date, 'sessionDeadline');
      this.sessionDeadline = sessionDeadline;
    }

    Validation.isInteger(resourcesTtl, 'resourcesTtl', true);
    this.resourcesTtl = resourcesTtl;

    Validation.isString(userTrackingId, 'userTrackingId', true);
    this.userTrackingId = userTrackingId;

    if (notifications) {
      Validation.instanceOf(notifications, NotificationConfig, 'notifications');
      this.notifications = notifications;
    }

    if (sdkConfig) {
      Validation.instanceOf(sdkConfig, SdkConfig, 'sdkConfig');
      this.sdkConfig = sdkConfig;
    }

    Validation.isArrayOfType(requestedChecks, RequestedCheck, 'requestedChecks');
    this.requestedChecks = requestedChecks;

    Validation.isArrayOfType(requestedTasks, RequestedTask, 'requestedTasks');
    this.requestedTasks = requestedTasks;

    if (requiredDocuments) {
      Validation.isArrayOfType(requiredDocuments, RequiredDocument, 'requiredDocuments');
      this.requiredDocuments = requiredDocuments;
    }

    Validation.isBoolean(blockBiometricConsent, 'blockBiometricConsent', true);
    this.blockBiometricConsent = blockBiometricConsent;
  }

  /**
   * @returns {Object} data for JSON.stringify()
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
    };
  }
}

module.exports = SessionSpecification;
