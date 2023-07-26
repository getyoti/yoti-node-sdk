const SupportedDocumentResponse = require('../../../../../../../src/idv_service/session/retrieve/configuration/capture/document/supported.document.response');

describe('SupportedDocumentResponse', () => {
  let supportedDocumentResponse;

  beforeEach(() => {
    supportedDocumentResponse = new SupportedDocumentResponse({
      type: 'DRIVING_LICENCE',
      is_strictly_latin: true,
    });
  });

  describe('#getType', () => {
    it('should return code', () => {
      expect(supportedDocumentResponse.getType()).toBe('DRIVING_LICENCE');
    });
  });

  describe('#getIsStrictlyLatin', () => {
    it('should return boolean', () => {
      expect(supportedDocumentResponse.getIsStrictlyLatin()).toBe(true);
    });
  });
});
