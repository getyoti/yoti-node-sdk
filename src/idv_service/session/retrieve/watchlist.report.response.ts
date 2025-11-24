import ReportResponse = require('./report.response');

class WatchlistReportResponse extends ReportResponse {
  constructor(report) {
    const currentClass = new.target;
    if (currentClass === WatchlistReportResponse) {
      throw new Error('WatchlistReportResponse can not be instantiated');
    }

    super(report);
  }
}

export default WatchlistReportResponse;
