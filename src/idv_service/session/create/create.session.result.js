'use strict';

const Validation = require('../../../yoti_common/validation');

/**
 * The response to a successful CreateSession call
 *
 * @class CreateSessionResult
 */
class CreateSessionResult {
  /**
   * @param {Object} response
   *   The parsed JSON response.
   */
  constructor(response) {
    Validation.isInteger(response.client_session_token_ttl, 'client_session_token_ttl', true);
    this.clientSessionTokenTtl = response.client_session_token_ttl;

    Validation.isString(response.client_session_token, 'client_session_token', true);
    this.clientSessionToken = response.client_session_token;

    Validation.isString(response.session_id, 'session_id', true);
    this.sessionId = response.session_id;
  }

  /**
   * Returns the time-to-live (TTL) for the client session
   * token for the created session
   *
   * @returns {int} the client session token TTL
   */
  getClientSessionTokenTtl() {
    return this.clientSessionTokenTtl;
  }

  /**
   * Returns the client session token for the created session
   *
   * @returns {string} the client session token
   */
  getClientSessionToken() {
    return this.clientSessionToken;
  }

  /**
   * Session ID of the created session
   *
   * @returns {string} the session id
   */
  getSessionId() {
    return this.sessionId;
  }
}

module.exports = CreateSessionResult;
