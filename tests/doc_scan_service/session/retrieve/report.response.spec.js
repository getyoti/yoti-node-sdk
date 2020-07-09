const ReportResponse = require('../../../../src/doc_scan_service/session/retrieve/report.response');
const RecommendationResponse = require('../../../../src/doc_scan_service/session/retrieve/recommendation.response');
const BreakdownResponse = require('../../../../src/doc_scan_service/session/retrieve/breakdown.response');

describe('ReportResponse', () => {
  let reportResponse;

  beforeEach(() => {
    reportResponse = new ReportResponse({
      recommendation: {},
      breakdown: [
        {},
        {},
      ],
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
});
