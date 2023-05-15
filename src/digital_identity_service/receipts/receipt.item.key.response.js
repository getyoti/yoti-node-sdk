'use strict';

const Validation = require('../../yoti_common/validation');

/**
 * The receipt item key response
 *
 * @class ReceiptItemKeyResponse
 */
class ReceiptItemKeyResponse {
  constructor(response) {
    Validation.isString(response.id, 'Receipt wrapped item key ID');
    this.id = response.id;

    Validation.isString(response.iv, 'Receipt wrapped item key iv');
    this.iv = response.iv;

    Validation.isString(response.value, 'Receipt wrapped item key value');
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
   * The encrypted Receipt Item Key
   *
   * @returns {string} The encrypted Receipt Item Key
   */
  getValue() {
    return this.value;
  }
}

module.exports = ReceiptItemKeyResponse;
