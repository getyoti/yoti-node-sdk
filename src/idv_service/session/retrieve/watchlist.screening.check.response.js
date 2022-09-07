'use strict';

const WatchlistCheckResponse = require('./watchlist.check.response');
const WatchlistScreeningReportResponse = require('./watchlist.screening.report.response');

class WatchlistScreeningCheckResponse extends WatchlistCheckResponse {
  constructor(check) {
    super(check);

    if (check.report) {
      this.report = new WatchlistScreeningReportResponse(check.report);
    }
  }

  /**
   *
   * @return {WatchlistScreeningReportResponse}
   */
  getReport() {
    return this.report;
  }
}

module.exports = WatchlistScreeningCheckResponse;
