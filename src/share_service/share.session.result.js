'use strict';

const Validation = require('../yoti_common/validation');

/**
 * The share session result
 *
 * @class ShareSessionResult
 */
module.exports = class ShareSessionResult {
  /**
   * @param {Object} response
   */
  constructor(response) {
    Validation.isString(response.id, 'Session ID');
    this.id = response.id;

    Validation.isString(response.status, 'Status');
    this.status = response.status;

    Validation.isString(response.expiry, 'Expiry');
    const expiryDate = new Date(response.expiry);
    if (expiryDate.toString() === 'Invalid Date') throw TypeError('Expiry must be a date like string');
    this.expiry = expiryDate;
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
