
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

  describe('#getType', () => {
    it('should return ID_DOCUMENT_TEXT_DATA_CHECK', () => {
      expect(generatedCheckResponse.getType()).toBe('ID_DOCUMENT_TEXT_DATA_CHECK');
    });
  });
});
