export = CreateSessionResult;
/**
 * The response to a successful CreateSession call
 *
 * @class CreateSessionResult
 */
declare class CreateSessionResult {
    /**
     * @param {Object} response
     *   The parsed JSON response.
     */
    constructor(response: any);
    clientSessionTokenTtl: any;
    clientSessionToken: any;
    sessionId: any;
    /**
     * Returns the time-to-live (TTL) for the client session
     * token for the created session
     *
     * @returns {number} the client session token TTL
     */
    getClientSessionTokenTtl(): number;
    /**
     * Returns the client session token for the created session
     *
     * @returns {string} the client session token
     */
    getClientSessionToken(): string;
    /**
     * Session ID of the created session
     *
     * @returns {string} the session id
     */
    getSessionId(): string;
}
