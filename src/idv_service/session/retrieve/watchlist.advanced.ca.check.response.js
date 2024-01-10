'use strict';

/**
 * @typedef {import('./report.response')} ReportResponse
 */

const WatchlistCheckResponse = require('./watchlist.check.response');
const WatchlistAdvancedCaReportResponse = require('./watchlist.advanced.ca.report.response');

class WatchlistAdvancedCaCheckResponse extends WatchlistCheckResponse {
  constructor(check) {
    super(check);

    if (check.report) {
      this.report = new WatchlistAdvancedCaReportResponse(check.report);
    }
  }

  /**
   * @returns {ReportResponse|WatchlistAdvancedCaReportResponse}
   */
  getReport() {
    return this.report;
  }
}

module.exports = WatchlistAdvancedCaCheckResponse;
