'use strict';

const Validation = require('../yoti_common/validation');

/**
 * The share session fetch result
 *
 * @class ShareReceiptItemKeyResult
 */
module.exports = class ShareReceiptItemKeyResult {
  /**
   * @param {Object} response
   */
  constructor(response) {
    Validation.isString(response.id, 'Receipt Item Key ID');
    this.id = response.id;

    Validation.isString(response.iv, 'Receipt Item Key iv');
    this.iv = response.iv;

    Validation.isString(response.value, 'Receipt Item Key value');
    this.value = response.value;
  }

  /**
   * The Receipt Item Key ID
   *
   * @returns {string} The Receipt Item Key ID
   */
  getId() {
    return this.id;
  }

  /**
   * The Receipt Item Key iv
   *
   * @returns {string} The Receipt Item Key iv
   */
  getIv() {
    return this.iv;
  }

  /**
   * The Receipt Item Key value
   *
   * @returns {string} The Receipt Item Key value
   */
  getValue() {
    return this.value;
  }
};
