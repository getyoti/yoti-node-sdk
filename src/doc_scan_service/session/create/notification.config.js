'use strict';

const Validation = require('../../../yoti_common/validation');

/**
 * Represents the configuration properties for
 * notifications within the Doc Scan system.
 *
 * Notifications can be configured within a Doc Scan
 * session to allow the clients backend to be notified
 * of certain events, without having to constantly poll
 * for the state of a session.
 *
 * @class NotificationConfig
 */
class NotificationConfig {
  /**
   * @param {string} authToken
   *   The authorization token set for the notification configuration
   * @param {string} endpoint
   *   The endpoint set for the notification configuration
   * @param {string[]} topics
   *   The list of topics for the notification configuration
   */
  constructor(authToken, endpoint, topics) {
    Validation.isString(authToken, 'authToken', true);
    this.authToken = authToken;

    Validation.isString(endpoint, 'endpoint', true);
    this.endpoint = endpoint;

    if (topics) {
      Validation.isArrayOfStrings(topics, 'topics');
      this.topics = topics;
    }
  }

  /**
   * @returns {Object} data for JSON.stringify()
   */
  toJSON() {
    return {
      auth_token: this.authToken,
      endpoint: this.endpoint,
      topics: this.topics,
    };
  }
}

module.exports = NotificationConfig;
