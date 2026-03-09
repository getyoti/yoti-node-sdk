'use strict';

const Validation = require('../yoti_common/validation');

/**
 * Bearer token authentication strategy.
 *
 * @class AuthTokenStrategy
 */
class AuthTokenStrategy {
  /**
   * @param {string} token
   */
  constructor(token) {
    Validation.isString(token, 'token');
    /** @private */
    this.token = token;
  }

  createAuthHeaders() {
    return { Authorization: `Bearer ${this.token}` };
  }

  // eslint-disable-next-line class-methods-use-this
  createQueryParams() {
    return {};
  }
}

module.exports = AuthTokenStrategy;
