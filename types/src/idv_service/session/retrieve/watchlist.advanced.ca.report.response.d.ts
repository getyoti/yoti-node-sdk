export = WatchlistAdvancedCaReportResponse;
declare class WatchlistAdvancedCaReportResponse extends WatchlistReportResponse {
    watchListSummary: WatchlistAdvancedCaSummaryResponse;
    /**
     *
     * @return {WatchlistAdvancedCaSummaryResponse}
     */
    getWatchlistSummary(): WatchlistAdvancedCaSummaryResponse;
}
import WatchlistReportResponse = require("./watchlist.report.response");
import WatchlistAdvancedCaSummaryResponse = require("./watchlist.advanced.ca.summary.response");
