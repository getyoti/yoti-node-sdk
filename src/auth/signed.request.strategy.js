'use strict';

const { v4: uuid } = require('uuid');
const yotiCommon = require('../yoti_common');
const Validation = require('../yoti_common/validation');

/**
 * Signed request authentication strategy.
 *
 * @class SignedRequestStrategy
 */
class SignedRequestStrategy {
  /**
   * @param {string} pem
   */
  constructor(pem) {
    Validation.notNullOrEmpty(pem, 'pem');
    /** @private */
    this.pem = pem;
  }

  /**
   * @param {string} method
   * @param {string} endpointPath
   * @param {string} payloadBase64
   *
   * @returns {Object.<string, string>}
   */
  createAuthHeaders(method, endpointPath, payloadBase64) {
    const messageSignature = yotiCommon.getRSASignatureForMessage(
      `${method}&${endpointPath}${payloadBase64}`,
      this.pem
    );
    return { 'X-Yoti-Auth-Digest': messageSignature };
  }

  /**
   * @returns {Object.<string, string|number>}
   */
  // eslint-disable-next-line class-methods-use-this
  createQueryParams() {
    return {
      nonce: uuid(),
      timestamp: Date.now(),
    };
  }
}

module.exports = SignedRequestStrategy;
