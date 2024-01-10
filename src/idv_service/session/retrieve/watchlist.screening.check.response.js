'use strict';

const WatchlistCheckResponse = require('./watchlist.check.response');
const WatchlistScreeningReportResponse = require('./watchlist.screening.report.response');

/**
 * @typedef {import('./report.response')} ReportResponse
 */

class WatchlistScreeningCheckResponse extends WatchlistCheckResponse {
  constructor(check) {
    super(check);

    if (check.report) {
      this.report = new WatchlistScreeningReportResponse(check.report);
    }
  }

  /**
   *
   * @return {ReportResponse|WatchlistScreeningReportResponse}
   */
  getReport() {
    return this.report;
  }
}

module.exports = WatchlistScreeningCheckResponse;
