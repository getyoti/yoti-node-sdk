const WatchlistReportResponse = require('../../../../src/doc_scan_service/session/retrieve/watch.list.report.response');
const RecommendationResponse = require('../../../../src/doc_scan_service/session/retrieve/recommendation.response');
const BreakdownResponse = require('../../../../src/doc_scan_service/session/retrieve/breakdown.response');
const WatchlistSummaryResponse = require('../../../../src/doc_scan_service/session/retrieve/watch.list.summary.response');

describe('WatchlistReportResponse', () => {
  let reportResponse;

  beforeEach(() => {
    reportResponse = new WatchlistReportResponse({
      recommendation: {},
      breakdown: [
        {},
        {},
      ],
      watchlist_summary: {},
    });
  });

  describe('#getRecommendation', () => {
    it('should return recommendation', () => {
      expect(reportResponse.getRecommendation()).toBeInstanceOf(RecommendationResponse);
    });
  });

  describe('#getBreakdown', () => {
    it('should return list of breakdown items', () => {
      const breakdownItems = reportResponse.getBreakdown();
      expect(breakdownItems.length).toBe(2);
      breakdownItems.forEach((breakdownItem) => {
        expect(breakdownItem).toBeInstanceOf(BreakdownResponse);
      });
    });
  });

  describe('#getWatchlistSummary', () => {
    it('should return watchlistSummary', () => {
      expect(reportResponse.getWatchlistSummary()).toBeInstanceOf(WatchlistSummaryResponse);
    });
  });
});
