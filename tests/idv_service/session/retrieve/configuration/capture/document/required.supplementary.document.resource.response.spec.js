const RequiredSupplementaryDocumentResourceResponse = require('../../../../../../../src/idv_service/session/retrieve/configuration/capture/document/required.supplementary.document.resource.response');

describe('RequiredSupplementaryDocumentResourceResponse', () => {
  let requiredSupplementaryDocumentResourceResponse;

  beforeEach(() => {
    // eslint-disable-next-line max-len
    requiredSupplementaryDocumentResourceResponse = new RequiredSupplementaryDocumentResourceResponse({
      type: 'SUPPLEMENTARY_DOCUMENT',
      id: '',
      state: '',
      document_types: [
        '',
      ],
      country_codes: [
        'GBR',
      ],
      objective: {
        type: '',
      },
    });
  });

  describe('#getDocumentTypes', () => {
    it('should return document types', () => {
      expect(requiredSupplementaryDocumentResourceResponse.getDocumentTypes()).toHaveLength(1);
      expect(requiredSupplementaryDocumentResourceResponse.getDocumentTypes()[0]).toBe('');
    });
  });

  describe('#getCountryCodes', () => {
    it('should return country codes', () => {
      expect(requiredSupplementaryDocumentResourceResponse.getCountryCodes()).toHaveLength(1);
      expect(requiredSupplementaryDocumentResourceResponse.getCountryCodes()[0]).toBe('GBR');
    });
  });

  describe('#getObjective', () => {
    it('should return objective', () => {
      expect(requiredSupplementaryDocumentResourceResponse.getObjective()).toEqual({
        type: '',
      });
    });
  });
});
