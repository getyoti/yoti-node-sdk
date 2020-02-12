
const CheckResponse = require('../../../../src/doc_scan_service/session/retrieve/check.response');

describe('CheckResponse', () => {
  describe('#constructor', () => {
    it('should throw exception when instantiated directly', () => {
      expect(() => new CheckResponse({}))
        .toThrow(new Error('CheckResponse cannot be instantiated'));
    });
  });
});
