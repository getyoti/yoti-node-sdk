'use strict';

const Validation = require('../yoti_common/validation');

/**
 * The share session fetch result
 *
 * @class GetShareSessionResult
 */
module.exports = class GetShareSessionResult {
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

      this.scannedQrCodeId = response.qrCode.id;
    }

    if (response.receipt) {
      Validation.isString(response.receipt.id, 'Receipt ID');

      this.receiptId = response.receipt.id;
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
   * The session qr code id
   *
   * @returns {string} The session qr code id
   */
  getScannedQrCodeId() {
    return this.scannedQrCodeId;
  }

  /**
   * The session receipt id
   *
   * @returns {string} The session receipt id
   */
  getReceiptId() {
    return this.receiptId;
  }
};
