import WatchlistScreeningSearchConfigResponse = require('./watchlist.screening.search.config.response');
import WatchlistSummaryResponse = require('./watchlist.summary.response');

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

export default WatchlistScreeningSummaryResponse;
