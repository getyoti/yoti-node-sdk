
const GeneratedCheckResponse = require('../../../../src/doc_scan_service/session/retrieve/generated.check.response');

describe('GeneratedCheckResponse', () => {
  let generatedCheckResponse;

  beforeEach(() => {
    generatedCheckResponse = new GeneratedCheckResponse({
      id: 'some-id',
    });
  });

  describe('#getId', () => {
    it('should return ID', () => {
      expect(generatedCheckResponse.getId()).toBe('some-id');
    });
  });
});
