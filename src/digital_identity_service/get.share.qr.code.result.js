'use strict';

const Validation = require('../yoti_common/validation');

/**
 * The fetch share QR code result
 *
 * @class GetShareQrCodeResult
 */
module.exports = class GetShareQrCodeResult {
  /**
   * @param {Object} response
   */
  constructor(response) {
    Validation.isString(response.id, 'QR code ID');
    this.id = response.id;

    Validation.isStringDate(response.expiry, 'Expiry');
    this.expiry = new Date(response.expiry);

    Validation.isPlainObject(response.session, 'Session');
    Validation.isString(response.session.id, 'Session ID');
    this.sessionId = response.session.id;

    Validation.isString(response.redirectUri, 'Redirect URI');
    this.redirectUri = response.redirectUri;
  }

  /**
   * The QR code ID
   *
   * @returns {string} The QR code ID
   */
  getId() {
    return this.id;
  }

  /**
   * The expiry
   *
   * @returns {Date} The expiry
   */
  getExpiry() {
    return this.expiry;
  }

  /**
   * The session ID
   *
   * @returns {string} The session ID
   */
  getSessionId() {
    return this.sessionId;
  }

  /**
   * The redirect uri
   *
   * @returns {string} The redirect uri
   */
  getRedirectUri() {
    return this.redirectUri;
  }
};
