'use strict';

const Validation = require('../../../yoti_common/validation');
const NotificationConfig = require('./notification.config');
const SdkConfig = require('./sdk.config');
const RequestedTask = require('./task/requested.task');
const RequestedCheck = require('./check/requested.check');

/**
 * Represents the specification of a session within the
 * Doc Scan system.
 *
 * This class represents all of the possible configuration
 * properties for a session in Doc Scan.  It can be used to
 * define the specification for a session, including tasks
 * and checks that should be performed in that specific session.
 *
 * @class SessionSpecification
 */
class SessionSpecification {
  /**
   * @param {int} clientSessionTokenTtl
   * @param {int} resourcesTtl
   * @param {string} userTrackingId
   * @param {NotificationConfig} notifications
   * @param {RequestedCheck[]} requestedChecks
   * @param {RequestedTask[]} requestedTasks
   * @param {SdkConfig} sdkConfig
   */
  constructor(
    clientSessionTokenTtl,
    resourcesTtl,
    userTrackingId,
    notifications,
    requestedChecks,
    requestedTasks,
    sdkConfig
  ) {
    Validation.isInteger(clientSessionTokenTtl, 'clientSessionTokenTtl', true);
    this.clientSessionTokenTtl = clientSessionTokenTtl;

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
  }

  /**
   * @returns {Object} data for JSON.stringify()
   */
  toJSON() {
    return {
      client_session_token_ttl: this.clientSessionTokenTtl,
      resources_ttl: this.resourcesTtl,
      user_tracking_id: this.userTrackingId,
      notifications: this.notifications,
      requested_checks: this.requestedChecks,
      requested_tasks: this.requestedTasks,
      sdk_config: this.sdkConfig,
    };
  }
}

module.exports = SessionSpecification;
