export = WatchlistScreeningCheckResponse;
declare class WatchlistScreeningCheckResponse extends WatchlistCheckResponse {
    /**
     *
     * @return {WatchlistScreeningReportResponse}
     */
    getReport(): WatchlistScreeningReportResponse;
}
import WatchlistCheckResponse = require("./watchlist.check.response");
import WatchlistScreeningReportResponse = require("./watchlist.screening.report.response");
