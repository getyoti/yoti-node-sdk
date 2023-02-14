'use strict';

const Validation = require('../yoti_common/validation');

/**
 * The share qrcode result
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
   * The qrcode id
   *
   * @returns {string} The qrcode id
   */
  getId() {
    return this.id;
  }

  /**
   * The qrcode uri
   *
   * @returns {string} The qrcode uri
   */
  getUri() {
    return this.uri;
  }
};
