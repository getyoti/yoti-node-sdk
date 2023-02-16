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
   * @returns {Promise<ShareSessionCreateResult>}
   */
  async createShareSession(shareSessionConfig) {
    return this.digitalIdentityService.createShareSession(shareSessionConfig);
  }

  /**
   *
   * @param sessionId
   * @returns {Promise<ShareSessionFetchResult>}
   */
  async fetchShareSession(sessionId) {
    return this.digitalIdentityService.fetchShareSession(sessionId);
  }

  /**
   *
   * @param sessionId
   * @returns {Promise<ShareQrCodeCreateResult>}
   */
  async createShareQrCode(sessionId) {
    return this.digitalIdentityService.createShareQrCode(sessionId);
  }

  /**
   *
   * @param qrCodeId
   * @returns {Promise<ShareQrCodeFetchResult>}
   */
  async fetchQrCode(qrCodeId) {
    return this.digitalIdentityService.fetchQrCode(qrCodeId);
  }
}

module.exports = DigitalIdentityClient;
