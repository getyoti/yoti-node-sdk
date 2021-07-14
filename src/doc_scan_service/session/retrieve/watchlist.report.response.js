'use strict';

const ReportResponse = require('./report.response');
const WatchlistSummaryResponse = require('./watchlist.summary.response');

class WatchlistReportResponse extends ReportResponse {
  constructor(report) {
    super(report);

    if (report.watchlist_summary) {
      this.watchListSummary = new WatchlistSummaryResponse(report.watchlist_summary);
    }
  }

  getWatchlistSummary() {
    return this.watchListSummary;
  }
}

module.exports = WatchlistReportResponse;
