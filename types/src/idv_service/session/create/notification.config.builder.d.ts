export = NotificationConfigBuilder;
/**
 * Builder to assist in the creation of {@link NotificationConfig}.
 *
 * @class NotificationConfigBuilder
 */
declare class NotificationConfigBuilder {
    /** @private */
    private topics;
    /**
     * Sets the authorization token to be included in call-back messages
     *
     * @param {string} authToken
     *
     * @returns {this}
     */
    withAuthToken(authToken: string): this;
    authToken: string;
    /**
     * Sets the authorization type as BASIC
     *
     * @returns {this}
     */
    withAuthTypeBasic(): this;
    authType: "BASIC" | "BEARER";
    /**
     * Sets the authorization type as BEARER
     *
     * @returns {this}
     */
    withAuthTypeBearer(): this;
    /**
     * Sets the endpoint that notifications should be sent to
     *
     * @param {string} endpoint
     *
     * @returns {this}
     */
    withEndpoint(endpoint: string): this;
    endpoint: string;
    /**
     * Adds RESOURCE_UPDATE to the list of topics that trigger notification messages
     *
     * @returns {this}
     */
    forResourceUpdate(): this;
    /**
     * Adds TASK_COMPLETION to the list of topics that trigger notification messages
     *
     * @returns {this}
     */
    forTaskCompletion(): this;
    /**
     * Adds CHECK_COMPLETION to the list of topics that trigger notification messages
     *
     * @returns {this}
     */
    forCheckCompletion(): this;
    /**
     * Adds SESSION_COMPLETION to the list of topics that trigger notification messages
     *
     * @returns {this}
     */
    forSessionCompletion(): this;
    /**
     * Adds a topic to the list of topics that trigger notification messages
     *
     * @param {string} topicName
     *
     * @returns {this}
     */
    withTopic(topicName: string): this;
    /**
     * Build the {@link NotificationConfig} using the supplied values
     *
     * @returns {NotificationConfig}
     */
    build(): NotificationConfig;
}
import NotificationConfig = require("./notification.config");
