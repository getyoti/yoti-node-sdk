'use strict';

const Validation = require('../yoti_common/validation');
const ShareReceiptResult = require('./share.receipt.result');

/**
 * The share receipts by sessionId result
 *
 * @class ShareReceiptsResult
 */
module.exports = class ShareReceiptsResult {
  /**
   * @param {Object} response
   */
  constructor(response) {
    Validation.isNumber(response.count, 'Count');
    this.count = response.count;

    Validation.isNumber(response.total, 'Total');
    this.total = response.total;

    Validation.isNumber(response.limit, 'Limit');
    this.limit = response.limit;

    Validation.isNumber(response.offset, 'Offset');
    this.offset = response.offset;

    Validation.isString(response.sort, 'Sort');
    this.sort = response.sort;

    Validation.isArray(response.results, 'Results');
    this.results = response.results.map((result) => new ShareReceiptResult(result));
  }

  /**
   * The number of receipts
   *
   * @returns {number} The number of receipts
   */
  getCount() {
    return this.count;
  }

  /**
   * The number of receipts returned
   *
   * @returns {number} The number of receipts returned
   */
  getTotal() {
    return this.total;
  }

  /**
   * The limit for the number of receipts requested
   *
   * @returns {number} The limit for the number of receipts requested
   */
  getLimit() {
    return this.limit;
  }

  /**
   * The offset of the list of receipts requested
   *
   * @returns {number} The offset of the list of receipts requested
   */
  getOffset() {
    return this.offset;
  }

  /**
   * The field that the receipts are sorted by
   *
   * @returns {string} The field that the receipts are sorted by
   */
  getSort() {
    return this.sort;
  }

  /**
   * The receipts that were requested
   *
   * @returns {ShareReceiptResult[]} The receipts that were requested
   */
  getResults() {
    return this.results;
  }
};
