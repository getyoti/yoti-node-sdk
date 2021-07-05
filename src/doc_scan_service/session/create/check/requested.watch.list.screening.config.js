'use strict';

const Validation = require('../../../../yoti_common/validation');
/**
 * The configuration applied when creating a RequestedWatchListScreeningCheck
 *
 * @class RequestedWatchListScreeningConfig
 */
class RequestedWatchListScreeningConfig {
  /**
   * @param {string[]} categories
   *   The list of categories corresponding to each watchlist screening conducted
   */
  constructor(categories) {
    if (categories) {
      Validation.isArrayOfStrings(categories, 'categories');
      this.categories = categories.filter((elem, pos) => categories.indexOf(elem) === pos);
    }
  }

  /**
   * @returns {Object} data for JSON.stringify()
   */
  toJSON() {
    return {
      categories: this.categories,
    };
  }
}

module.exports = RequestedWatchListScreeningConfig;
