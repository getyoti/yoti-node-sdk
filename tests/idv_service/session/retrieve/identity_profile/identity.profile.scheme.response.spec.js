const IdentityProfileSchemeResponse = require('../../../../../src/idv_service/session/retrieve/identity_profile/identity.profile.scheme.response');

describe('IdentityProfileSchemeResponse', () => {
  let identityProfileSchemeResponse;

  beforeEach(() => {
    identityProfileSchemeResponse = new IdentityProfileSchemeResponse({
      type: 'DBS',
      objective: 'STANDARD',
    });
  });

  describe('#getType', () => {
    it('should return type', () => {
      expect(identityProfileSchemeResponse.getType()).toBe('DBS');
    });
  });

  describe('#getObjective', () => {
    it('should return objective', () => {
      expect(identityProfileSchemeResponse.getObjective()).toBe('STANDARD');
    });
  });
});
