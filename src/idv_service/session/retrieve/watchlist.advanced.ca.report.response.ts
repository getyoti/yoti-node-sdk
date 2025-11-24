import WatchlistReportResponse = require('./watchlist.report.response');
import WatchlistAdvancedCaSummaryResponse = require('./watchlist.advanced.ca.summary.response');

class WatchlistAdvancedCaReportResponse extends WatchlistReportResponse {
  constructor(report) {
    super(report);

    if (report.watchlist_summary) {
      /** @private */
      this.watchListSummary = new WatchlistAdvancedCaSummaryResponse(report.watchlist_summary);
    }
  }

  /**
   *
   * @return {WatchlistAdvancedCaSummaryResponse}
   */
  getWatchlistSummary() {
    return this.watchListSummary;
  }
}

export default WatchlistAdvancedCaReportResponse;
