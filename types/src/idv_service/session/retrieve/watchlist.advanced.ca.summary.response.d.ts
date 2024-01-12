export = WatchlistAdvancedCaSummaryResponse;
declare class WatchlistAdvancedCaSummaryResponse extends WatchlistSummaryResponse {
    /** @private */
    private searchConfig;
    /**
     * @returns {WatchlistAdvancedCaSearchConfigResponse}
     */
    getSearchConfig(): WatchlistAdvancedCaSearchConfigResponse;
}
import WatchlistSummaryResponse = require("./watchlist.summary.response");
import WatchlistAdvancedCaSearchConfigResponse = require("./watchlist.advanced.ca.search.config.response");
