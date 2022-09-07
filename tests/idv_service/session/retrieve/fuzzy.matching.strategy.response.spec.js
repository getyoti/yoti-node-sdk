const CaMatchingStrategyResponse = require('../../../../src/idv_service/session/retrieve/ca.matching.strategy.response');
const FuzzyMatchingStrategyResponse = require('../../../../src/idv_service/session/retrieve/fuzzy.matching.strategy.response');

describe('FuzzyMatchingStrategyResponse', () => {
  it('is a class that extends CaMatchingStrategyResponse', () => {
    expect(FuzzyMatchingStrategyResponse.prototype).toBeInstanceOf(CaMatchingStrategyResponse);
  });
  describe('given an instance of the class', () => {
    let fuzzyMatchingStrategyResponse;

    beforeEach(() => {
      fuzzyMatchingStrategyResponse = new FuzzyMatchingStrategyResponse({
        type: 'FUZZY',
        fuzziness: 0.78,
      });
    });

    it('#getType', () => {
      expect(fuzzyMatchingStrategyResponse.getType()).toBe('FUZZY');
    });

    it('#getFuzziness', () => {
      expect(fuzzyMatchingStrategyResponse.getFuzziness()).toBe(0.78);
    });
  });
});
