const SupportedDocumentResponse = require('../../../../../../../src/idv_service/session/retrieve/configuration/capture/document/supported.document.response');

describe('SupportedDocumentResponse', () => {
  let supportedDocumentResponse;

  beforeEach(() => {
    supportedDocumentResponse = new SupportedDocumentResponse({
      type: 'DRIVING_LICENCE',
      providers: ['p1', 'p2'],
    });
  });

  describe('#getType', () => {
    it('should return code', () => {
      expect(supportedDocumentResponse.getType()).toBe('DRIVING_LICENCE');
    });
  });

  describe('#getProviders', () => {
    it('should return providers list', () => {
      expect(supportedDocumentResponse.getProviders()).toEqual(['p1', 'p2']);
    });
  });
});
