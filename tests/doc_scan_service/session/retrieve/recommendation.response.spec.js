const RecommendationResponse = require('../../../../src/doc_scan_service/session/retrieve/recommendation.response');

describe('RecommendationResponse', () => {
  let recommendationResponse;

  beforeEach(() => {
    recommendationResponse = new RecommendationResponse({
      value: 'some-value',
      reason: 'some-reason',
      recovery_suggestion: 'some-suggestion',
    });
  });

  describe('#getValue', () => {
    it('should return value', () => {
      expect(recommendationResponse.getValue()).toBe('some-value');
    });
  });

  describe('#getReason', () => {
    it('should return reason', () => {
      expect(recommendationResponse.getReason()).toBe('some-reason');
    });
  });

  describe('#getRecoverySuggestion', () => {
    it('should return recovery suggestion', () => {
      expect(recommendationResponse.getRecoverySuggestion()).toBe('some-suggestion');
    });
  });
});
