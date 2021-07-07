const ProfileCheckResponse = require('./profile.check.response');
const WatchListReportResponse = require('./watch.list.report.response');

class WatchlistCheckResponse extends ProfileCheckResponse {
  constructor(check) {
    super(check);

    if (check.report) {
      this.report = new WatchListReportResponse(check.report);
    }
  }

  /**
   * @returns {WatchListReportResponse}
   */
  getReport() {
    return this.report;
  }
}

module.exports = WatchlistCheckResponse;
