'use strict';

const Validation = require('../yoti_common/validation');

/**
 * Defines the Share QR code creation result.
 *
 * @class CreateShareQrCodeResult
 */
module.exports = class CreateShareQrCodeResult {
  /**
   * @param {Object} response
   */
  constructor(response) {
    Validation.isString(response.id, 'QR code ID');
    /** @private */
    this.id = response.id;

    if (response.uri) {
      Validation.isString(response.uri, 'URI');
      /** @private */
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
