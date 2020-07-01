const GeneratedTextDataCheckResponse = require('../../../../src/doc_scan_service/session/retrieve/generated.text.data.check.response');

describe('GeneratedTextDataCheckResponse', () => {
  let generatedCheckResponse;

  beforeEach(() => {
    generatedCheckResponse = new GeneratedTextDataCheckResponse({
      id: 'some-id',
      type: 'some-type',
    });
  });

  describe('#getId', () => {
    it('should return ID', () => {
      expect(generatedCheckResponse.getId()).toBe('some-id');
    });
  });

  describe('#getType', () => {
    it('should return type', () => {
      expect(generatedCheckResponse.getType()).toBe('some-type');
    });
  });
});
