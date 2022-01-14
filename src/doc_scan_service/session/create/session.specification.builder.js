'use strict';

const SessionSpecification = require('./session.specification');
const NotificationConfig = require('./notification.config');
const RequestedTask = require('./task/requested.task');
const RequestedCheck = require('./check/requested.check');
const SdkConfig = require('./sdk.config');
const RequiredDocument = require('./filters/required.document');
const Validation = require('../../../yoti_common/validation');

/**
 * Builder to assist the creation of {@link SessionSpecification}.
 *
 * @class SessionSpecificationBuilder
 */
class SessionSpecificationBuilder {
  constructor() {
    this.requestedChecks = [];
    this.requestedTasks = [];
    this.requiredDocuments = [];
  }

  /**
   * Sets the client session token TTL (time-to-live)
   *
   * @param {int} clientSessionTokenTtl
   *   The client session token TTL
   *
   * @returns {this}
   */
  withClientSessionTokenTtl(clientSessionTokenTtl) {
    Validation.isInteger(clientSessionTokenTtl, 'clientSessionTokenTtl');
    this.clientSessionTokenTtl = clientSessionTokenTtl;
    return this;
  }

  /**
   * Sets the session deadline (alternative to session token TTL)
   *
   * @param {Date} sessionDeadline
   *   The session deadline date-time
   *
   * @returns {this}
   */
  withSessionDeadline(sessionDeadline) {
    Validation.instanceOf(sessionDeadline, Date, 'sessionDeadline');
    this.sessionDeadline = sessionDeadline;
    return this;
  }

  /**
   * Sets the resources TTL (time-to-live)
   *
   * @param {int} resourcesTtl
   *   The resources TTL
   *
   * @returns {this}
   */
  withResourcesTtl(resourcesTtl) {
    Validation.isInteger(resourcesTtl, 'resourcesTtl');
    this.resourcesTtl = resourcesTtl;
    return this;
  }

  /**
   * Sets the user tracking ID
   *
   * @param {string} userTrackingId
   *   The user tracking ID
   *
   * @returns {this}
   */
  withUserTrackingId(userTrackingId) {
    Validation.isString(userTrackingId, 'userTrackingId');
    this.userTrackingId = userTrackingId;
    return this;
  }

  /**
   * Sets the {@link NotificationConfig}
   *
   * @param {NotificationConfig} notifications
   *
   * @returns {this}
   */
  withNotifications(notifications) {
    Validation.instanceOf(notifications, NotificationConfig, 'notifications');
    this.notifications = notifications;
    return this;
  }

  /**
   * Adds a {@link RequestedCheck} to the list
   *
   * @param {RequestedCheck} requestedCheck
   *
   * @returns {this}
   */
  withRequestedCheck(requestedCheck) {
    Validation.instanceOf(requestedCheck, RequestedCheck, 'requestedCheck');
    this.requestedChecks.push(requestedCheck);
    return this;
  }

  /**
   * Adds a {@link RequestedTask} to the list
   *
   * @param {RequestedTask} requestedTasks
   *
   * @return
   */
  withRequestedTask(requestedTask) {
    Validation.instanceOf(requestedTask, RequestedTask, 'requestedTask');
    this.requestedTasks.push(requestedTask);
    return this;
  }

  /**
   * Sets the {@link SdkConfig}
   *
   * @param {SdkConfig} sdkConfig
   *
   * @returns {this}
   */
  withSdkConfig(sdkConfig) {
    Validation.instanceOf(sdkConfig, SdkConfig, 'sdkConfig');
    this.sdkConfig = sdkConfig;
    return this;
  }

  /**
   * Adds a {@link RequiredDocument} to the list documents required from the client
   *
   * @param {RequiredDocument} requiredDocument
   *
   * @returns {this}
   */
  withRequiredDocument(requiredDocument) {
    Validation.instanceOf(requiredDocument, RequiredDocument, 'requiredDocument');
    this.requiredDocuments.push(requiredDocument);
    return this;
  }

  /**
   * Sets whether or not to block the collection of biometric consent
   *
   * @param {bool} blockBiometricConsent
   *
   * @return {this}
   */
  withBlockBiometricConsent(blockBiometricConsent) {
    Validation.isBoolean(blockBiometricConsent, 'blockBiometricConsent');
    this.blockBiometricConsent = blockBiometricConsent;
    return this;
  }

  /**
   * Builds the {@link SessionSpec} based on the values supplied to the builder
   *
   * @returns {SessionSpec}
   */
  build() {
    return new SessionSpecification(
      this.clientSessionTokenTtl,
      this.resourcesTtl,
      this.userTrackingId,
      this.notifications,
      this.requestedChecks,
      this.requestedTasks,
      this.sdkConfig,
      this.requiredDocuments,
      this.blockBiometricConsent,
      this.sessionDeadline
    );
  }
}

module.exports = SessionSpecificationBuilder;
