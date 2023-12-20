export = WatchlistAdvancedCaCheckResponse;
declare class WatchlistAdvancedCaCheckResponse extends WatchlistCheckResponse {
    /**
     * @returns {WatchlistAdvancedCaReportResponse}
     */
    getReport(): WatchlistAdvancedCaReportResponse;
}
import WatchlistCheckResponse = require("./watchlist.check.response");
import WatchlistAdvancedCaReportResponse = require("./watchlist.advanced.ca.report.response");
