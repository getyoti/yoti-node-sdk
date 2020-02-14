
const GeneratedTextDataCheckResponse = require('../../../../src/doc_scan_service/session/retrieve/generated.text.data.check.response');

describe('GeneratedCheckResponse', () => {
  let generatedCheckResponse;

  beforeEach(() => {
    generatedCheckResponse = new GeneratedTextDataCheckResponse({
      id: 'some-id',
    });
  });

  describe('#getId', () => {
    it('should return ID', () => {
      expect(generatedCheckResponse.getId()).toBe('some-id');
    });
  });
});
