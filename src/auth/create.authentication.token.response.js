'use strict';

/**
 * Response from the authentication token endpoint.
 *
 * @class CreateAuthenticationTokenResponse
 */
class CreateAuthenticationTokenResponse {
  /**
   * @param {Object} response
   * @param {string} response.access_token
   * @param {string} response.token_type
   * @param {number} response.expires_in
   * @param {string} response.scope
   */
  constructor(response) {
    /** @private */
    this.accessToken = response.access_token;
    /** @private */
    this.tokenType = response.token_type;
    /** @private */
    this.expiresIn = response.expires_in;
    /** @private */
    this.scope = response.scope;
  }

  /**
   * @returns {string}
   */
  getAccessToken() {
    return this.accessToken;
  }

  /**
   * @returns {string}
   */
  getTokenType() {
    return this.tokenType;
  }

  /**
   * @returns {number}
   */
  getExpiresIn() {
    return this.expiresIn;
  }

  /**
   * @returns {string}
   */
  getScope() {
    return this.scope;
  }
}

module.exports = CreateAuthenticationTokenResponse;
