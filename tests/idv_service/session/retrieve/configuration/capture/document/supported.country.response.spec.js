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
        },
        {
          type: 'PASSPORT',
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
      expect(
        supportedCountryResponse.getSupportedDocuments()[0]
      ).toBeInstanceOf(SupportedDocumentResponse);
    });
  });
});
