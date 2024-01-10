export = NotificationConfig;
/**
 * Configures call-back Notifications to some backend endpoint provided
 * by the Relying Business.
 *
 * Notifications can be configured to notified a client backend of certain
 * events, avoiding the need to poll for the state of the Session.
 *
 * @class NotificationConfig
 */
declare class NotificationConfig {
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
    constructor(authToken: string, endpoint: string, topics: string[], authType: string);
    /** @private */
    private authToken;
    /** @private */
    private endpoint;
    /** @private */
    private topics;
    /** @private */
    private authType;
    /**
     * Returns serialized data for JSON.stringify()
     */
    toJSON(): {
        auth_token: string;
        auth_type: string;
        endpoint: string;
        topics: string[];
    };
}
