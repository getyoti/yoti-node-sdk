'use strict';

const Validation = require('../../../yoti_common/validation');
const ResourceContainer = require('./resource.container');
const CheckResponse = require('./check.response');
const AuthenticityCheckResponse = require('./authenticity.check.response');
const FaceMatchCheckResponse = require('./face.match.check.response');
const TextDataCheckResponse = require('./text.data.check.response');
const SupplementaryDocumentTextDataCheckResponse = require('./supplementary.document.text.data.check.response');
const LivenessCheckResponse = require('./liveness.check.response');
const IdDocumentComparisonCheckResponse = require('./id.document.comparison.check.response');
const ThirdPartyIdentityCheckResponse = require('./third.party.identity.check.response');
const WatchlistScreeningCheckResponse = require('./watchlist.screening.check.response');
const WatchlistAdvancedCaCheckResponse = require('./watchlist.advanced.ca.check.response');
const DocScanConstants = require('../../doc.scan.constants');
const { YotiDate } = require('../../../data_type/date');

class GetSessionResult {
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
            case DocScanConstants.ID_DOCUMENT_COMPARISON:
              return new IdDocumentComparisonCheckResponse(check);
            case DocScanConstants.THIRD_PARTY_IDENTITY:
              return new ThirdPartyIdentityCheckResponse(check);
            case DocScanConstants.WATCHLIST_SCREENING:
              return new WatchlistScreeningCheckResponse(check);
            case DocScanConstants.WATCHLIST_ADVANCED_CA:
              return new WatchlistAdvancedCaCheckResponse(check);
            case DocScanConstants.ID_DOCUMENT_FACE_MATCH:
              return new FaceMatchCheckResponse(check);
            case DocScanConstants.ID_DOCUMENT_TEXT_DATA_CHECK:
              return new TextDataCheckResponse(check);
            case DocScanConstants.SUPPLEMENTARY_DOCUMENT_TEXT_DATA_CHECK:
              return new SupplementaryDocumentTextDataCheckResponse(check);
            case DocScanConstants.LIVENESS:
              return new LivenessCheckResponse(check);
            default:
              return new CheckResponse(check);
          }
        });
    } else {
      this.checks = [];
    }

    if (response.resources) {
      Validation.instanceOf(response.resources, Object);
      this.resources = new ResourceContainer(response.resources);
    }

    if (response.biometric_consent) {
      this.biometricConsent = YotiDate.fromDateString(response.biometric_consent);
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
   * @returns {AuthenticityCheckResponse[]}
   */
  getAuthenticityChecks() {
    return this.getChecks().filter((check) => check instanceof AuthenticityCheckResponse);
  }

  /**
   * @returns {FaceMatchCheckResponse[]}
   */
  getFaceMatchChecks() {
    return this.getChecks().filter((check) => check instanceof FaceMatchCheckResponse);
  }

  /**
   * @returns {TextDataCheckResponse[]}
   */
  getIdDocumentTextDataChecks() {
    return this.getChecks().filter((check) => check instanceof TextDataCheckResponse);
  }

  /**
   * @deprecated replaced by getIdDocumentTextDataChecks()
   *
   * @returns {TextDataCheckResponse[]}
   */
  getTextDataChecks() {
    return this.getIdDocumentTextDataChecks();
  }

  /**
   * @returns {SupplementaryDocumentTextDataCheckResponse[]}
   */
  getSupplementaryDocumentTextDataChecks() {
    return this
      .getChecks()
      .filter((check) => check instanceof SupplementaryDocumentTextDataCheckResponse);
  }

  /**
   * @returns {LivenessCheckResponse[]}
   */
  getLivenessChecks() {
    return this.getChecks().filter((check) => check instanceof LivenessCheckResponse);
  }

  /**
   * @returns {IdDocumentComparisonCheckResponse[]}
   */
  getIdDocumentComparisonChecks() {
    return this.getChecks().filter((check) => check instanceof IdDocumentComparisonCheckResponse);
  }

  /**
   * @returns {ThirdPartyIdentityCheckResponse[]}
   */
  getThirdPartyIdentityChecks() {
    return this.getChecks().filter((check) => check instanceof ThirdPartyIdentityCheckResponse);
  }

  /**
   * @returns {WatchlistScreeningCheckResponse[]}
   */
  getWatchlistScreeningChecks() {
    return this.getChecks().filter((check) => check instanceof WatchlistScreeningCheckResponse);
  }

  /**
   * @returns {WatchlistAdvancedCaCheckResponse[]}
   */
  getWatchlistAdvancedCaChecks() {
    return this.getChecks().filter((check) => check instanceof WatchlistAdvancedCaCheckResponse);
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

  /**
   * @returns {YotiDate}
   */
  getBiometricConsentTimestamp() {
    return this.biometricConsent;
  }
}

module.exports = GetSessionResult;
