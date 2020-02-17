'use strict';

const Validation = require('../../../yoti_common/validation');
const ResourceContainer = require('./resource.container');
const CheckResponse = require('./check.response');
const AuthenticityCheckResponse = require('./authenticity.check.response');
const FaceMatchCheckResponse = require('./face.match.check.response');
const TextDataCheckResponse = require('./text.data.check.response');
const ZoomLivenessCheckResponse = require('./zoom.liveness.check.response');
const DocScanConstants = require('../../doc.scan.constants');

class DocScanSession {
  constructor(response) {
    Validation.isInteger(response.client_session_token_ttl, 'client_session_token_ttl', true);
    this.clientSessionTokenTtl = response.client_session_token_ttl;

    Validation.isString(response.session_id, 'session_id', true);
    this.sessionId = response.session_id;

    Validation.isString(response.user_tracking_id, 'user_tracking_id', true);
    this.userTrackingId = response.user_tracking_id;

    Validation.isString(response.state, 'state', true);
    this.state = response.state;

    Validation.isString(response.client_session_token, 'client_session_token', true);
    this.clientSessionToken = response.client_session_token;

    if (response.checks) {
      Validation.isArray(response.checks, 'checks');
      this.checks = response
        .checks
        .map((check) => {
          switch (check.type) {
            case DocScanConstants.ID_DOCUMENT_AUTHENTICITY:
              return new AuthenticityCheckResponse(check);
            case DocScanConstants.ID_DOCUMENT_TEXT_DATA_CHECK:
              return new FaceMatchCheckResponse(check);
            case DocScanConstants.ID_DOCUMENT_FACE_MATCH:
              return new TextDataCheckResponse(check);
            case DocScanConstants.LIVENESS:
              return new ZoomLivenessCheckResponse(check);
            default:
              return new CheckResponse(check);
          }
        })
        .filter(check => check !== null);
    }

    if (response.resources) {
      Validation.instanceOf(response.resources, Object);
      this.resources = new ResourceContainer(response.resources);
    }
  }

  /**
   * @returns {string}
   */
  getSessionId() {
    return this.sessionId;
  }

  /**
   * @returns {int}
   */
  getClientSessionTokenTtl() {
    return this.clientSessionTokenTtl;
  }

  /**
   * @returns {string}
   */
  getState() {
    return this.state;
  }

  /**
   * @returns {string}
   */
  getClientSessionToken() {
    return this.clientSessionToken;
  }

  /**
   * @returns {CheckResponse[]}
   */
  getChecks() {
    return this.checks;
  }

  /**
   * @returns {ResourceContainer}
   */
  getResources() {
    return this.resources;
  }

  /**
   * @returns {string}
   */
  getUserTrackingId() {
    return this.userTrackingId;
  }
}

module.exports = DocScanSession;
