'use strict';

const Validation = require('../../../../yoti_common/validation');
const CaptureResponse = require('./capture/capture.response');

class SessionConfigurationResponse {
  constructor(payload) {
    Validation.isNumber(payload.client_session_token_ttl, 'client_session_token_ttl');
    this.clientSessionTokenTtl = payload.client_session_token_ttl;

    Validation.isString(payload.session_id, 'session_id');
    this.sessionId = payload.session_id;

    Validation.isArray(payload.requested_checks, 'requested_checks');
    this.requestedChecks = payload.requested_checks;

    Validation.isPlainObject(payload.capture, 'capture');
    this.capture = new CaptureResponse(payload.capture);
  }

  /**
   * Returns the amount of time remaining in seconds until the session
   * expires.
   *
   * @return {number | null}
   */
  getClientSessionTokenTtl() {
    return this.clientSessionTokenTtl;
  }

  /**
   * Returns the session ID that the configuration belongs to
   *
   * @return {string | null}
   */
  getSessionId() {
    return this.sessionId;
  }

  /**
   * Returns a list of strings, signifying the checks that have been requested
   * in the session
   *
   * @return {string[] | null}
   */
  getRequestedChecks() {
    return this.requestedChecks;
  }

  /**
   * Returns information about what needs to be captured to fulfil the
   * sessions requirements
   *
   * @return {CaptureResponse | null}
   */
  getCapture() {
    return this.capture;
  }
}

module.exports = SessionConfigurationResponse;
