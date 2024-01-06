export = WatchlistAdvancedCaReportResponse;
declare class WatchlistAdvancedCaReportResponse extends WatchlistReportResponse {
    /** @private */
    private watchListSummary;
    /**
     *
     * @return {WatchlistAdvancedCaSummaryResponse}
     */
    getWatchlistSummary(): WatchlistAdvancedCaSummaryResponse;
}
import WatchlistReportResponse = require("./watchlist.report.response");
import WatchlistAdvancedCaSummaryResponse = require("./watchlist.advanced.ca.summary.response");
