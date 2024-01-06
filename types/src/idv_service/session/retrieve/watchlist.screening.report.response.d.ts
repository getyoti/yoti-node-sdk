export = WatchlistScreeningReportResponse;
declare class WatchlistScreeningReportResponse extends WatchlistReportResponse {
    /** @private */
    private watchListSummary;
    /**
     *
     * @return {WatchlistScreeningSummaryResponse}
     */
    getWatchlistSummary(): WatchlistScreeningSummaryResponse;
}
import WatchlistReportResponse = require("./watchlist.report.response");
import WatchlistScreeningSummaryResponse = require("./watchlist.screening.summary.response");
