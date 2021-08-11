const ReportResponse = require('../../../../src/doc_scan_service/session/retrieve/report.response');
const WatchlistReportResponse = require('../../../../src/doc_scan_service/session/retrieve/watchlist.report.response');

describe('WatchlistReportResponse', () => {
  it('is class that extends ReportResponse', () => {
    expect(WatchlistReportResponse.prototype).toBeInstanceOf(ReportResponse);
  });

  describe('is an abstract class', () => {
    it('should not be instantiable', () => {
      expect(() => {
        // eslint-disable-next-line no-new
        new WatchlistReportResponse();
      }).toThrow('WatchlistReportResponse can not be instantiated');
    });
  });
});
