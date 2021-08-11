const CaMatchingStrategyResponse = require('../../../../src/doc_scan_service/session/retrieve/ca.matching.strategy.response');

describe('CaMatchingStrategyResponse', () => {
  describe('is an abstract class', () => {
    it('should not be instantiable', () => {
      expect(() => {
        // eslint-disable-next-line no-new
        new CaMatchingStrategyResponse();
      }).toThrow('CaMatchingStrategyResponse can not be instantiated');
    });
  });
});
