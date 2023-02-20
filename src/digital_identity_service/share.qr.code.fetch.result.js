'use strict';

const Validation = require('../yoti_common/validation');

const ShareSessionCreateResult = require('./share.session.create.result');

/**
 * The fetch share QR code result
 *
 * @class ShareQrCodeFetchResult
 */
module.exports = class ShareQrCodeFetchResult {
  /**
   * @param {Object} response
   */
  constructor(response) {
    Validation.isString(response.id, 'QR code ID');
    this.id = response.id;

    Validation.isStringDate(response.expiry, 'Expiry');
    this.expiry = new Date(response.expiry);

    Validation.isPlainObject(response.session, 'Session');
    this.session = new ShareSessionCreateResult(response.session);

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
   * The session
   *
   * @returns {ShareSessionCreateResult} The session
   */
  getSession() {
    return this.session;
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
