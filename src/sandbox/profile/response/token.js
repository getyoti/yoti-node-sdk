/**
 * @class TokenResponse
 */
class TokenResponse {
  /**
   * @param {Object} responseData
   */
  constructor(responseData) {
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

module.exports = {
  TokenResponse,
};
