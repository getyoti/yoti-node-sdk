const CaSourcesResponse = require('../../../../src/doc_scan_service/session/retrieve/ca.sources.response');

describe('CaSourcesResponse', () => {
  describe('is an abstract class', () => {
    it('should not be instantiable', () => {
      expect(() => {
        // eslint-disable-next-line no-new
        new CaSourcesResponse();
      }).toThrow('CaSourcesResponse can not be instantiated');
    });
  });
});
