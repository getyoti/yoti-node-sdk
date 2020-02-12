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
   * Sets the authorization token on the builder
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
   * Sets the endpoint on the builder
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
   * Adds the resource update topic to the builder
   *
   * @returns {this}
   */
  forResourceUpdate() {
    return this.withTopic(DocScanConstants.RESOURCE_UPDATE);
  }

  /**
   * Adds the task completion topic to the builder
   *
   * @returns {this}
   */
  forTaskCompletion() {
    return this.withTopic(DocScanConstants.TASK_COMPLETION);
  }

  /**
   * Adds the check completion topic to the builder
   *
   * @returns {this}
   */
  forCheckCompletion() {
    return this.withTopic(DocScanConstants.CHECK_COMPLETION);
  }

  /**
   * Adds the session completion topic to the builder
   *
   * @returns {this}
   */
  forSessionCompletion() {
    return this.withTopic(DocScanConstants.SESSION_COMPLETION);
  }

  /**
   * Adds the specified topic to the builder
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
