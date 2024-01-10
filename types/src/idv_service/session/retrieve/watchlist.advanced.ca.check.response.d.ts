export = WatchlistAdvancedCaCheckResponse;
declare class WatchlistAdvancedCaCheckResponse extends WatchlistCheckResponse {
    /**
     * @returns {ReportResponse|WatchlistAdvancedCaReportResponse}
     */
    getReport(): ReportResponse | WatchlistAdvancedCaReportResponse;
}
declare namespace WatchlistAdvancedCaCheckResponse {
    export { ReportResponse };
}
import WatchlistCheckResponse = require("./watchlist.check.response");
import WatchlistAdvancedCaReportResponse = require("./watchlist.advanced.ca.report.response");
type ReportResponse = import('./report.response');
