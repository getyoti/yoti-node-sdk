'use strict';

const WatchlistScreeningSearchConfigResponse = require('./watchlist.screening.search.config.response');
const WatchlistSummaryResponse = require('./watchlist.summary.response');

class WatchlistScreeningSummaryResponse extends WatchlistSummaryResponse {
  constructor(summary) {
    super(summary);

    if (summary.search_config) {
      /** @private */
      this.searchConfig = new WatchlistScreeningSearchConfigResponse(summary.search_config);
    }
  }

  /**
   * @returns {WatchlistScreeningSearchConfigResponse}
   */
  getSearchConfig() {
    return this.searchConfig;
  }
}

module.exports = WatchlistScreeningSummaryResponse;
