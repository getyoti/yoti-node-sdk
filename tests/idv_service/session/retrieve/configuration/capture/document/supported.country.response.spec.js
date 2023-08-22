const SupportedCountryResponse = require('../../../../../../../src/idv_service/session/retrieve/configuration/capture/document/supported.country.response');
const SupportedDocumentResponse = require('../../../../../../../src/idv_service/session/retrieve/configuration/capture/document/supported.document.response');

describe('SupportedCountryResponse', () => {
  let supportedCountryResponse;

  beforeEach(() => {
    supportedCountryResponse = new SupportedCountryResponse({
      code: 'GBR',
      supported_documents: [
        {
          type: 'DRIVING_LICENCE',
          is_strictly_latin: true,
        },
        {
          type: 'PASSPORT',
          is_strictly_latin: false,
        },
      ],
    });
  });

  describe('#getCode', () => {
    it('should return code', () => {
      expect(supportedCountryResponse.getCode()).toBe('GBR');
    });
  });

  describe('#getSupportedDocuments', () => {
    it('should return requested tasks', () => {
      expect(supportedCountryResponse.getSupportedDocuments()).toHaveLength(2);

      const [firstResponse, secondResponse] = supportedCountryResponse.getSupportedDocuments();

      expect(firstResponse).toBeInstanceOf(SupportedDocumentResponse);
      expect(firstResponse.getType()).toBe('DRIVING_LICENCE');
      expect(firstResponse.getIsStrictlyLatin()).toBe(true);

      expect(secondResponse).toBeInstanceOf(SupportedDocumentResponse);
      expect(secondResponse.getType()).toBe('PASSPORT');
      expect(secondResponse.getIsStrictlyLatin()).toBe(false);
    });
  });
});
