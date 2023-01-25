'use strict';

const Validation = require('../yoti_common/validation');

const ShareSessionResult = require('./share.session.result');

/**
 * The share qrcode result
 *
 * @class ShareQrCodeFetchResult
 */
module.exports = class ShareQrCodeFetchResult {
  /**
   * @param {Object} response
   */
  constructor(response) {
    Validation.isString(response.id, 'QrCode ID');
    this.id = response.id;

    Validation.isString(response.uri, 'Uri');
    this.uri = response.uri;

    Validation.isString(response.expiry, 'Expiry');
    const expiryDate = new Date(response.expiry);
    if (expiryDate.toString() === 'Invalid Date') throw TypeError('Expiry must be a date like string');
    this.expiry = expiryDate;

    Validation.isString(response.policy, 'Policy');
    this.policy = response.policy;

    Validation.isArray(response.extensions, 'Extensions');
    this.extensions = response.extensions;

    Validation.isPlainObject(response.session, 'Session');
    this.session = new ShareSessionResult(response.session);

    Validation.isString(response.redirectUri, 'Redirect Uri');
    this.redirectUri = response.redirectUri;
  }

  /**
   * The qrcode id
   *
   * @returns {string} The qrcode id
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
   * The policy
   *
   * @returns {string} The policy
   */
  getPolicy() {
    return this.policy;
  }

  /**
   * The extensions
   *
   * @returns {Array} The extensions
   */
  getExtensions() {
    return this.extensions;
  }

  /**
   * The session
   *
   * @returns {Object} The session
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
