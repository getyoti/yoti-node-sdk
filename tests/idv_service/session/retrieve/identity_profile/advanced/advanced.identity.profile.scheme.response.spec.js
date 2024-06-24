const AdvancedIdentityProfileSchemeResponse = require('../../../../../../src/idv_service/session/retrieve/identity_profile/advanced/advanced.identity.profile.scheme.response');

describe('AdvancedIdentityProfileSchemeResponse', () => {
  let advancedIdentityProfileSchemeResponse;

  beforeEach(() => {
    advancedIdentityProfileSchemeResponse = new AdvancedIdentityProfileSchemeResponse({
      type: 'DBS',
      objective: 'STANDARD',
      label: 'dbs-standard',
    });
  });

  describe('#getType', () => {
    it('should return type', () => {
      expect(advancedIdentityProfileSchemeResponse.getType()).toBe('DBS');
    });
  });

  describe('#getObjective', () => {
    it('should return objective', () => {
      expect(advancedIdentityProfileSchemeResponse.getObjective()).toBe('STANDARD');
    });
  });

  describe('#getLabel', () => {
    it('should return label', () => {
      expect(advancedIdentityProfileSchemeResponse.getLabel()).toBe('dbs-standard');
    });
  });
});
