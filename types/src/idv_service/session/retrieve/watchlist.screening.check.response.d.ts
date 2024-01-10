export = WatchlistScreeningCheckResponse;
/**
 * @typedef {import('./report.response')} ReportResponse
 */
declare class WatchlistScreeningCheckResponse extends WatchlistCheckResponse {
    /**
     *
     * @return {ReportResponse|WatchlistScreeningReportResponse}
     */
    getReport(): ReportResponse | WatchlistScreeningReportResponse;
}
declare namespace WatchlistScreeningCheckResponse {
    export { ReportResponse };
}
import WatchlistCheckResponse = require("./watchlist.check.response");
import WatchlistScreeningReportResponse = require("./watchlist.screening.report.response");
type ReportResponse = import('./report.response');
