'use strict';

const Validation = require('../yoti_common/validation');

/**
 * The share QR code result
 *
 * @class ShareQrCodeResult
 */
module.exports = class ShareQrCodeResult {
  /**
   * @param {Object} response
   */
  constructor(response) {
    Validation.isString(response.id, 'QR code ID');
    this.id = response.id;

    if (response.uri) {
      Validation.isString(response.uri, 'URI');
      this.uri = response.uri;
    }
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
   * The URI
   *
   * @returns {string} The URI
   */
  getUri() {
    return this.uri;
  }
};
