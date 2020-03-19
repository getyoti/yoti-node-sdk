'use strict';

const NotificationConfig = require('./notification.config');
const Validation = require('../../../yoti_common/validation');
const DocScanConstants = require('../../doc.scan.constants');

/**
 * Builder to assist in the creation of {@link NotificationConfig}.
 *
 * @class NotificationConfigBuilder
 */
class NotificationConfigBuilder {
  /**
   * Setup default builder properties
   */
  constructor() {
    this.topics = [];
  }

  /**
   * Sets the authorization token to be included in call-back messages
   *
   * @param {string} authToken
   *
   * @returns {this}
   */
  withAuthToken(authToken) {
    Validation.isString(authToken, 'authToken');
    this.authToken = authToken;
    return this;
  }

  /**
   * Sets the endpoint that notifications should be sent to
   *
   * @param {string} endpoint
   *
   * @returns {this}
   */
  withEndpoint(endpoint) {
    Validation.isString(endpoint, 'endpoint');
    this.endpoint = endpoint;
    return this;
  }

  /**
   * Adds RESOURCE_UPDATE to the list of topics that trigger notification messages
   *
   * @returns {this}
   */
  forResourceUpdate() {
    return this.withTopic(DocScanConstants.RESOURCE_UPDATE);
  }

  /**
   * Adds TASK_COMPLETION to the list of topics that trigger notification messages
   *
   * @returns {this}
   */
  forTaskCompletion() {
    return this.withTopic(DocScanConstants.TASK_COMPLETION);
  }

  /**
   * Adds CHECK_COMPLETION to the list of topics that trigger notification messages
   *
   * @returns {this}
   */
  forCheckCompletion() {
    return this.withTopic(DocScanConstants.CHECK_COMPLETION);
  }

  /**
   * Adds SESSION_COMPLETION to the list of topics that trigger notification messages
   *
   * @returns {this}
   */
  forSessionCompletion() {
    return this.withTopic(DocScanConstants.SESSION_COMPLETION);
  }

  /**
   * Adds a topic to the list of topics that trigger notification messages
   *
   * @param {string} topicName
   *
   * @returns {this}
   */
  withTopic(topicName) {
    Validation.isString(topicName, 'topicName');
    this.topics.push(topicName);
    return this;
  }

  /**
   * Build the {@link NotificationConfig} using the supplied values
   *
   * @returns {NotificationConfig}
   */
  build() {
    return new NotificationConfig(
      this.authToken,
      this.endpoint,
      this.topics
    );
  }
}

module.exports = NotificationConfigBuilder;
