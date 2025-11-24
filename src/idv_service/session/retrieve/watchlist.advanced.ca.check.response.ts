/**
 * @typedef {import('./report.response')} ReportResponse
 */

import WatchlistCheckResponse = require('./watchlist.check.response');
import WatchlistAdvancedCaReportResponse = require('./watchlist.advanced.ca.report.response');

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

export default WatchlistAdvancedCaCheckResponse;
