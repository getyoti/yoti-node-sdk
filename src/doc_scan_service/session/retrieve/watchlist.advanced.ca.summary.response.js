'use strict';

const WatchlistAdvancedCaSearchConfigResponse = require('./watchlist.advanced.ca.search.config.response');
const WatchlistSummaryResponse = require('./watchlist.summary.response');
const YotiAccountWatchlistCaSearchConfigResponse = require('./yoti.account.watchlist.ca.search.config.response');
const CustomAccountWatchlistCaSearchConfigResponse = require('./custom.account.watchlist.ca.search.config.response');

const WatchlistAdvancedCaSearchConfigResponseClassesByType = {
  // eslint-disable-next-line max-len
  [WatchlistAdvancedCaSearchConfigResponse.types.WITH_YOTI_ACCOUNT]: YotiAccountWatchlistCaSearchConfigResponse,
  // eslint-disable-next-line max-len
  [WatchlistAdvancedCaSearchConfigResponse.types.WITH_CUSTOM_ACCOUNT]: CustomAccountWatchlistCaSearchConfigResponse,
};

class WatchlistAdvancedCaSummaryResponse extends WatchlistSummaryResponse {
  constructor(summary) {
    super(summary);

    if (summary.search_config) {
      // eslint-disable-next-line max-len
      const WatchlistAdvancedCaSearchConfigResponseClass = WatchlistAdvancedCaSearchConfigResponseClassesByType[summary.search_config.type];
      if (WatchlistAdvancedCaSearchConfigResponseClass) {
        this.searchConfig = new WatchlistAdvancedCaSearchConfigResponseClass(summary.search_config);
      }
    }
  }

  /**
   * @returns {WatchlistAdvancedCaSearchConfigResponse}
   */
  getSearchConfig() {
    return this.searchConfig;
  }
}

module.exports = WatchlistAdvancedCaSummaryResponse;
