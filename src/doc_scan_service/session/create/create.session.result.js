'use strict';

const Validation = require('../../../yoti_common/validation');

/**
 * Represents the JSON response returned by the Doc Scan
 * API when a session has been created.
 *
 * This class can be used to represent the JSON response
 * that is given by the Doc Scan API when a session has been created.
 * It contains information such as client session token, session ID
 * and client session token time-to-live (TTL)
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
   * Returns the session id for the created session
   *
   * @returns {string} the session id
   */
  getSessionId() {
    return this.sessionId;
  }
}

module.exports = CreateSessionResult;
