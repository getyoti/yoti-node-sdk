'use strict';

const ReportResponse = require('./report.response');
const WatchListSummaryResponse = require('./watch.list.summary.response');

class WatchListReportResponse extends ReportResponse {
  constructor(report) {
    super(report);

    if (report.watchlist_summary) {
      this.watchListSummary = new WatchListSummaryResponse(report.watchlist_summary);
    }
  }

  getWatchListSummary() {
    return this.watchListSummary;
  }
}

module.exports = WatchListReportResponse;
