const RequiredResourceResponse = require('../../../../../../src/idv_service/session/retrieve/configuration/capture/required.resource.response');
const EndUserAllowedSourceResponse = require('../../../../../../src/idv_service/session/retrieve/configuration/capture/source/end.user.allowed.source.response');
const IbvAllowedSourceResponse = require('../../../../../../src/idv_service/session/retrieve/configuration/capture/source/ibv.allowed.source.response');
const RelyingBusinessAllowedSourceResponse = require('../../../../../../src/idv_service/session/retrieve/configuration/capture/source/relying.business.allowed.source.response');
const UnknownAllowedSourceResponse = require('../../../../../../src/idv_service/session/retrieve/configuration/capture/source/unknown.allowed.source.response');

describe('RequiredResourceResponse', () => {
  let requiredResourceResponse;

  beforeEach(() => {
    requiredResourceResponse = new RequiredResourceResponse({
      type: 'ID_DOCUMENT',
      id: '123',
      state: 'REQUIRED',
      allowed_sources: [
        {
          type: 'END_USER',
        },
        {
          type: 'RELYING_BUSINESS',
        },
        {
          type: 'IBV',
        },
        {
          type: 'Unknown_Type',
        },
      ],
    });
  });

  describe('#getType', () => {
    it('should return type', () => {
      expect(requiredResourceResponse.getType()).toBe('ID_DOCUMENT');
    });
  });

  describe('#getId', () => {
    it('should return id', () => {
      expect(requiredResourceResponse.getId()).toBe('123');
    });
  });

  describe('#getState', () => {
    it('should return state', () => {
      expect(requiredResourceResponse.getState()).toBe('REQUIRED');
    });
  });

  describe('#getAllowedSources', () => {
    it('should return allowed sources', () => {
      expect(requiredResourceResponse.getAllowedSources()).toHaveLength(4);

      expect(
        requiredResourceResponse.getAllowedSources()[0]
      ).toBeInstanceOf(EndUserAllowedSourceResponse);
      expect(
        requiredResourceResponse.getAllowedSources()[1]
      ).toBeInstanceOf(RelyingBusinessAllowedSourceResponse);
      expect(
        requiredResourceResponse.getAllowedSources()[2]
      ).toBeInstanceOf(IbvAllowedSourceResponse);
      expect(
        requiredResourceResponse.getAllowedSources()[3]
      ).toBeInstanceOf(UnknownAllowedSourceResponse);
    });
  });
});
