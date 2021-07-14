const ProfileCheckResponse = require('./profile.check.response');
const WatchlistReportResponse = require('./watch.list.report.response');

class WatchlistCheckResponse extends ProfileCheckResponse {
  constructor(check) {
    super(check);

    if (check.report) {
      this.report = new WatchlistReportResponse(check.report);
    }
  }

  /**
   * @returns {WatchlistReportResponse}
   */
  getReport() {
    return this.report;
  }
}

module.exports = WatchlistCheckResponse;
