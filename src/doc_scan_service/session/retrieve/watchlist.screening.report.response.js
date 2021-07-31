'use strict';

const WatchlistReportResponse = require('./watchlist.report.response');
const WatchlistScreeningSummaryResponse = require('./watchlist.screening.summary.response');

class WatchlistScreeningReportResponse extends WatchlistReportResponse {
  constructor(report) {
    super(report);

    if (report.watchlist_summary) {
      this.watchListSummary = new WatchlistScreeningSummaryResponse(report.watchlist_summary);
    }
  }

  /**
   *
   * @return {WatchlistScreeningSummaryResponse}
   */
  getWatchlistSummary() {
    return this.watchListSummary;
  }
}

module.exports = WatchlistScreeningReportResponse;
