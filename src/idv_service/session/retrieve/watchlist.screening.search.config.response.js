'use strict';

const Validation = require('../../../yoti_common/validation');
const WatchlistSearchConfigResponse = require('./watchlist.search.config.response');

class WatchlistScreeningSearchConfigResponse extends WatchlistSearchConfigResponse {
  constructor(searchConfig) {
    super();

    if (searchConfig.categories) {
      Validation.isArrayOfStrings(searchConfig.categories, 'categories');
      /** @private */
      this.categories = searchConfig.categories;
    } else {
      /** @private */
      this.categories = [];
    }
  }

  /**
   * @returns {string[]}
   */
  getCategories() {
    return this.categories;
  }
}

module.exports = WatchlistScreeningSearchConfigResponse;
