const RequiredIdDocumentResourceResponse = require('../../../../../../../src/idv_service/session/retrieve/configuration/capture/document/required.id.document.resource.response');
const SupportedCountryResponse = require('../../../../../../../src/idv_service/session/retrieve/configuration/capture/document/supported.country.response');

describe('RequiredIdDocumentResourceResponse', () => {
  let requiredIdDocumentResourceResponse;

  beforeEach(() => {
    requiredIdDocumentResourceResponse = new RequiredIdDocumentResourceResponse({
      type: 'ID_DOCUMENT',
      id: '',
      state: '',
      supported_countries: [
        {
          code: 'GBR',
        },
      ],
      allowed_capture_methods: 'CAMERA_AND_UPLOAD',
      attempts_remaining: {
        GENERIC: 3,
        RECLASSIFICATION: 2,
      },
    });
  });

  describe('#getSupportedCountries', () => {
    it('should return supported countries', () => {
      expect(requiredIdDocumentResourceResponse.getSupportedCountries()).toHaveLength(1);
      expect(
        requiredIdDocumentResourceResponse.getSupportedCountries()[0]
      ).toBeInstanceOf(SupportedCountryResponse);
    });
  });

  describe('#getAllowedCaptureMethods', () => {
    it('should return allowed capture methods', () => {
      expect(requiredIdDocumentResourceResponse.getAllowedCaptureMethods()).toBe('CAMERA_AND_UPLOAD');
    });
  });

  describe('#getAttemptsRemaining', () => {
    it('should return attempts remaining', () => {
      expect(requiredIdDocumentResourceResponse.getAttemptsRemaining()).toEqual({
        GENERIC: 3,
        RECLASSIFICATION: 2,
      });
    });
  });
});
