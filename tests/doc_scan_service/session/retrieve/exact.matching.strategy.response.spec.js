const CaMatchingStrategyResponse = require('../../../../src/doc_scan_service/session/retrieve/ca.matching.strategy.response');
const ExactMatchingStrategyResponse = require('../../../../src/doc_scan_service/session/retrieve/exact.matching.strategy.response');

describe('ExactMatchingStrategyResponse', () => {
  it('is a class that extends CaMatchingStrategyResponse', () => {
    expect(ExactMatchingStrategyResponse.prototype instanceof CaMatchingStrategyResponse);
  });
  describe('given an instance of the class (exact match is true)', () => {
    let exactMatchingStrategyResponse;

    beforeEach(() => {
      exactMatchingStrategyResponse = new ExactMatchingStrategyResponse({
        type: 'EXACT',
        exact_match: true,
      });
    });

    it('#getType', () => {
      expect(exactMatchingStrategyResponse.getType()).toBe('EXACT');
    });

    it('#getFuzziness', () => {
      expect(exactMatchingStrategyResponse.isExactMatch()).toBe(true);
    });
  });
  describe('given an instance of the class (exact match is true)', () => {
    let exactMatchingStrategyResponse;

    beforeEach(() => {
      exactMatchingStrategyResponse = new ExactMatchingStrategyResponse({
        type: 'EXACT',
        exact_match: false,
      });
    });

    it('#getType', () => {
      expect(exactMatchingStrategyResponse.getType()).toBe('EXACT');
    });

    it('#getFuzziness', () => {
      expect(exactMatchingStrategyResponse.isExactMatch()).toBe(false);
    });
  });
});
