export = WatchlistScreeningReportResponse;
declare class WatchlistScreeningReportResponse extends WatchlistReportResponse {
    watchListSummary: WatchlistScreeningSummaryResponse;
    /**
     *
     * @return {WatchlistScreeningSummaryResponse}
     */
    getWatchlistSummary(): WatchlistScreeningSummaryResponse;
}
import WatchlistReportResponse = require("./watchlist.report.response");
import WatchlistScreeningSummaryResponse = require("./watchlist.screening.summary.response");
