export = WatchlistScreeningSummaryResponse;
declare class WatchlistScreeningSummaryResponse extends WatchlistSummaryResponse {
    searchConfig: WatchlistScreeningSearchConfigResponse;
    /**
     * @returns {WatchlistScreeningSearchConfigResponse}
     */
    getSearchConfig(): WatchlistScreeningSearchConfigResponse;
}
import WatchlistSummaryResponse = require("./watchlist.summary.response");
import WatchlistScreeningSearchConfigResponse = require("./watchlist.screening.search.config.response");
