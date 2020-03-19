'use strict';

const Validation = require('../../../yoti_common/validation');

/**
 * Configures call-back Notifications to some backend endpoint provided
 * by the Relying Business.
 *
 * Notifications can be configured to notified a client backend of certain
 * events, avoiding the neeed to poll for the state of the Session.
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
   */
  constructor(authToken, endpoint, topics) {
    Validation.isString(authToken, 'authToken', true);
    this.authToken = authToken;

    Validation.isString(endpoint, 'endpoint', true);
    this.endpoint = endpoint;

    if (topics) {
      Validation.isArrayOfStrings(topics, 'topics');
      this.topics = topics.filter((elem, pos) => topics.indexOf(elem) === pos);
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
