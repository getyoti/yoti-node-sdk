
const GeneratedCheckResponse = require('../../../../src/doc_scan_service/session/retrieve/generated.check.response');

describe('GeneratedCheckResponse', () => {
  describe('#constructor', () => {
    it('should throw exception when instantiated directly', () => {
      expect(() => new GeneratedCheckResponse({}))
        .toThrow(new Error('GeneratedCheckResponse cannot be instantiated'));
    });
  });
});
