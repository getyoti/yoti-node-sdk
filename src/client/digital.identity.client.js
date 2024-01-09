'use strict';

const config = require('../../config');
const { DigitalIdentityService } = require('../digital_identity_service');

class DigitalIdentityClient {
  /**
   * @param {string} sdkId
   * @param {string|Buffer} pem
   * @param {{apiUrl?: string}} options
   */
  constructor(sdkId, pem, { apiUrl } = {}) {
    const options = {
      apiUrl: apiUrl || config.yoti.digitalIdentityApi,
    };

    /** @private */
    this.digitalIdentityService = new DigitalIdentityService(sdkId, pem, options);
  }

  /**
   * @typedef {import('../digital_identity_service/share.session.configuration.js')} ShareSessionConfig
   *
   * @param {ShareSessionConfig} shareSessionConfig
   *
   * @typedef {import('../digital_identity_service/create.share.session.result.js')} CreateShareSessionResult
   *
   * @returns {Promise<CreateShareSessionResult>}
   */
  async createShareSession(shareSessionConfig) {
    return this.digitalIdentityService.createShareSession(shareSessionConfig);
  }

  /**
   * @param {string} sessionId
   *
   * @typedef {import('../digital_identity_service/get.share.session.result.js')} GetShareSessionResult
   *
   * @returns {Promise<GetShareSessionResult>}
   */
  async getShareSession(sessionId) {
    return this.digitalIdentityService.getShareSession(sessionId);
  }

  /**
   * @param {string} sessionId
   *
   * @typedef {import('../digital_identity_service/create.share.qr.code.result.js')} CreateShareQrCodeResult
   *
   * @returns {Promise<CreateShareQrCodeResult>}
   */
  async createShareQrCode(sessionId) {
    return this.digitalIdentityService.createShareQrCode(sessionId);
  }

  /**
   * @param {string} qrCodeId
   *
   * @typedef {import('../digital_identity_service/get.share.qr.code.result.js')} GetShareQrCodeResult
   *
   * @returns {Promise<GetShareQrCodeResult>}
   */
  async getShareQrCode(qrCodeId) {
    return this.digitalIdentityService.getShareQrCode(qrCodeId);
  }

  /**
   * @param {string} receiptId
   *
   * @typedef {import('../digital_identity_service/get.share.receipt.result.js')} GetShareReceiptResult
   *
   * @returns {Promise<GetShareReceiptResult>}
   */
  async getShareReceipt(receiptId) {
    return this.digitalIdentityService.getShareReceipt(receiptId);
  }
}

module.exports = DigitalIdentityClient;
