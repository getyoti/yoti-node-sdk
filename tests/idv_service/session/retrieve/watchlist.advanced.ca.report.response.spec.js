const RecommendationResponse = require('../../../../src/idv_service/session/retrieve/recommendation.response');
const BreakdownResponse = require('../../../../src/idv_service/session/retrieve/breakdown.response');
const WatchlistAdvancedCaSummaryResponse = require('../../../../src/idv_service/session/retrieve/watchlist.advanced.ca.summary.response');
const WatchlistReportResponse = require('../../../../src/idv_service/session/retrieve/watchlist.report.response');
const WatchlistAdvancedCaReportResponse = require('../../../../src/idv_service/session/retrieve/watchlist.advanced.ca.report.response');

describe('WatchlistScreeningReportResponse', () => {
  it('is a class that extends WatchlistSummaryResponse', () => {
    expect(WatchlistAdvancedCaReportResponse.prototype).toBeInstanceOf(WatchlistReportResponse);
  });

  describe('given an instance of the class', () => {
    let reportResponse;

    beforeEach(() => {
      reportResponse = new WatchlistAdvancedCaReportResponse({
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
        expect(reportResponse.getWatchlistSummary())
          .toBeInstanceOf(WatchlistAdvancedCaSummaryResponse);
      });
    });
  });
});
