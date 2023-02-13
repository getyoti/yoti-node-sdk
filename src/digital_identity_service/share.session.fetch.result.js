'use strict';

const Validation = require('../yoti_common/validation');

/**
 * The share session fetch result
 *
 * @class ShareSessionFetchResult
 */
module.exports = class ShareSessionFetchResult {
  /**
   * @param {Object} response
   */
  constructor(response) {
    Validation.isString(response.id, 'Session ID');
    this.id = response.id;

    Validation.isString(response.status, 'Status');
    this.status = response.status;

    Validation.isStringDate(response.created, 'Created');
    this.created = new Date(response.created);

    Validation.isStringDate(response.updated, 'Updated');
    this.updated = new Date(response.updated);

    if (response.expiry) {
      Validation.isStringDate(response.expiry, 'Expiry');
      this.expiry = new Date(response.expiry);
    }

    if (response.qrCode) {
      Validation.isString(response.qrCode.id, 'QrCode ID');

      const { id } = response.qrCode;

      this.qrCode = {
        id,
      };
    }

    if (response.receipt) {
      Validation.isString(response.receipt.id, 'Receipt ID');

      const { id } = response.receipt;

      this.receipt = {
        id,
      };
    }
  }

  /**
   * The share id
   *
   * @returns {string} The share id
   */
  getId() {
    return this.id;
  }

  /**
   * The session status
   *
   * @returns {string} The session status
   */
  getStatus() {
    return this.status;
  }

  /**
   * The session expiry date
   *
   * @returns {Date} The session expiry date
   */
  getExpiry() {
    return this.expiry;
  }

  /**
   * The session updated date
   *
   * @returns {Date} The session updated date
   */
  getUpdated() {
    return this.updated;
  }

  /**
   * The session created date
   *
   * @returns {Date} The session created date
   */
  getCreated() {
    return this.created;
  }

  /**
   * The session qr code
   *
   * @returns {{id: string}} The session qr code
   */
  getQrCode() {
    return this.qrCode;
  }

  /**
   * The session receipt
   *
   * @returns {{id: string}} The session receipt
   */
  getReceipt() {
    return this.receipt;
  }
};
