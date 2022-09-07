'use strict';

const ReportResponse = require('./report.response');

class WatchlistReportResponse extends ReportResponse {
  constructor(report) {
    const currentClass = new.target;
    if (currentClass === WatchlistReportResponse) {
      throw new Error('WatchlistReportResponse can not be instantiated');
    }

    super(report);
  }
}

module.exports = WatchlistReportResponse;
