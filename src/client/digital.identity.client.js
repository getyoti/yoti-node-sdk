'use strict';

const config = require('../../config');
const { DigitalIdentityService } = require('../digital_identity_service');

class DigitalIdentityClient {
  /**
   * @param {string} sdkId
   * @param {string|Buffer} pem
   * @param {Object} options
   * @param {string} options.apiUrl
   */
  constructor(sdkId, pem, { apiUrl } = {}) {
    const options = {
      apiUrl: apiUrl || config.yoti.digitalIdentityApi,
    };

    this.digitalIdentityService = new DigitalIdentityService(sdkId, pem, options);
  }

  /**
   *
   * @param shareSessionConfig
   * @returns {Promise<CreateShareSessionResult>}
   */
  async createShareSession(shareSessionConfig) {
    return this.digitalIdentityService.createShareSession(shareSessionConfig);
  }

  /**
   *
   * @param sessionId
   * @returns {Promise<GetShareSessionResult>}
   */
  async getShareSession(sessionId) {
    return this.digitalIdentityService.getShareSession(sessionId);
  }

  /**
   *
   * @param sessionId
   * @returns {Promise<CreateShareQrCodeResult>}
   */
  async createShareQrCode(sessionId) {
    return this.digitalIdentityService.createShareQrCode(sessionId);
  }

  /**
   *
   * @param qrCodeId
   * @returns {Promise<GetShareQrCodeResult>}
   */
  async getShareQrCode(qrCodeId) {
    return this.digitalIdentityService.getShareQrCode(qrCodeId);
  }

  /**
   *
   * @param {string} receiptId
   * @returns {Promise<GetShareReceiptResult>}
   */
  async getShareReceipt(receiptId) {
    return this.digitalIdentityService.getShareReceipt(receiptId);
  }
}

module.exports = DigitalIdentityClient;
