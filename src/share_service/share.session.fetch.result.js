'use strict';

const Validation = require('../yoti_common/validation');
const ShareQrCodeResult = require('./share.qr.code.result');

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

    Validation.isString(response.expiry, 'Expiry');
    const expiryDate = new Date(response.expiry);
    if (expiryDate.toString() === 'Invalid Date') throw TypeError('Expiry must be a date like string');
    this.expiry = expiryDate;

    Validation.isString(response.created, 'Created');
    const createdDate = new Date(response.created);
    if (createdDate.toString() === 'Invalid Date') throw TypeError('Expiry must be a date like string');
    this.created = createdDate;

    Validation.isString(response.updated, 'Updated');
    const updatedDate = new Date(response.updated);
    if (updatedDate.toString() === 'Invalid Date') throw TypeError('Expiry must be a date like string');
    this.updated = updatedDate;

    if (response.qrCode) {
      Validation.isPlainObject(response.qrCode, 'QrCode');
      this.qrCode = new ShareQrCodeResult(response.qrCode);
    }

    if (response.receipt) {
      Validation.isPlainObject(response.receipt, 'Receipt');
      this.receipt = response.receipt;
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
   * @returns {ShareQrCodeResult} The session qr code
   */
  getQrCode() {
    return this.qrCode;
  }

  /**
   * The session receipt
   *
   * @returns {Object} The session receipt
   */
  getReceipt() {
    return this.receipt;
  }
};
