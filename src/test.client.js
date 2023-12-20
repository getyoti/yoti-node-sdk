'use strict';

/* eslint-disable max-len */

const config = require('../config');

/**
 * Client used for communication with the Yoti IDV service
 *
 * The {@code IDVClient} facilitates requests to the Yoti IDV service
 *
 * @class IDVClient
 */
class TestClient {
  /**
   * @param {string} sdkId
   * @param {string|Buffer} pem
   * @param {Object} options
   * @param {string} options.apiUrl
   */
  constructor(sdkId, pem, { apiUrl } = {}) {
    const options = {
      apiUrl: apiUrl || config.yoti.idvApi,
    };
    this.options = options;
  }
}

module.exports = TestClient;
