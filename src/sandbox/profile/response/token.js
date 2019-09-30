const Validation = require('../../../yoti_common/validation');

/**
 * @class TokenResponse
 */
class TokenResponse {
  /**
   * @param {Object} responseData
   */
  constructor(responseData) {
    if (!(responseData instanceof Object)) {
      throw new Error(`${this.constructor.name} responseData should be an object`);
    }
    Validation.isString(responseData.token, 'responseData.token');
    this.token = responseData.token;
  }

  /**
   * @returns {string}
   *   Encrypted Yoti token (can be only decrypted with your application's private key)
   */
  getToken() {
    return this.token;
  }
}

module.exports = TokenResponse;
