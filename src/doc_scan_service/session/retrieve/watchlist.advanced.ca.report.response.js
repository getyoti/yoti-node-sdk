'use strict';

const WatchlistReportResponse = require('./watchlist.report.response');
const WatchlistAdvancedCaSummaryResponse = require('./watchlist.advanced.ca.summary.response');

class WatchlistAdvancedCaReportResponse extends WatchlistReportResponse {
  constructor(report) {
    super(report);

    if (report.watchlist_summary) {
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

module.exports = WatchlistAdvancedCaReportResponse;
