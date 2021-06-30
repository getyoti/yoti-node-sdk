'use strict';

const DocScanConstants = require('../../doc.scan.constants');
const Validation = require('../../../yoti_common/validation');

const acceptedAuthTypes = [DocScanConstants.BASIC, DocScanConstants.BEARER];

/**
 * Configures call-back Notifications to some backend endpoint provided
 * by the Relying Business.
 *
 * Notifications can be configured to notified a client backend of certain
 * events, avoiding the need to poll for the state of the Session.
 *
 * @class NotificationConfig
 */
class NotificationConfig {
  /**
   * @param {string} authToken
   *   The authorization token to be included in call-back messages
   * @param {string} endpoint
   *   The endpoint that notifications should be sent to
   * @param {string[]} topics
   *   The list of topics that should trigger notifications
   * @param {string} authType
   *   The authorization type to used in call-back messages, accepts BASIC, BEARER
   */
  constructor(authToken, endpoint, topics, authType) {
    Validation.isString(authToken, 'authToken', true);
    this.authToken = authToken;

    Validation.isString(endpoint, 'endpoint', true);
    this.endpoint = endpoint;

    if (topics) {
      Validation.isArrayOfStrings(topics, 'topics');
      this.topics = topics.filter((elem, pos) => topics.indexOf(elem) === pos);
    }

    Validation.isString(authType, 'authType', true);
    if (authType) {
      Validation.oneOf(authType, acceptedAuthTypes, 'authType');
      this.authType = authType;
    }
  }

  /**
   * @returns {Object} data for JSON.stringify()
   */
  toJSON() {
    return {
      auth_token: this.authToken,
      auth_type: this.authType,
      endpoint: this.endpoint,
      topics: this.topics,
    };
  }
}

module.exports = NotificationConfig;
