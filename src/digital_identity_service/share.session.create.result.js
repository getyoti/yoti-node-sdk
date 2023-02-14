'use strict';

const Validation = require('../yoti_common/validation');

/**
 * The share session result
 *
 * @class ShareSessionCreateResult
 */
module.exports = class ShareSessionCreateResult {
  /**
   * @param {Object} response
   */
  constructor(response) {
    Validation.isString(response.id, 'Session ID');
    this.id = response.id;

    Validation.isString(response.status, 'Status');
    this.status = response.status;

    Validation.isStringDate(response.expiry, 'Expiry');
    this.expiry = new Date(response.expiry);
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
};
