const AdvancedIdentityProfileRequirements = require('../../../../../../src/idv_service/session/create/identity_profile/advanced/advanced.identity.profile.requirements');
const AdvancedIdentityProfileRequirementsBuilder = require('../../../../../../src/idv_service/session/create/identity_profile/advanced/advanced.identity.profile.requirements.builder');
const AdvancedIdentityProfile = require('../../../../../../src/idv_service/session/create/identity_profile/advanced/advanced.identity.profile');
const AdvancedIdentityProfileScheme = require('../../../../../../src/idv_service/session/create/identity_profile/advanced/advanced.identity.profile.scheme');

const profile1 = new AdvancedIdentityProfile('UK_TFIDA', [
  new AdvancedIdentityProfileScheme('DBS', 'STANDARD', 'dbs-standard'),
  new AdvancedIdentityProfileScheme('RTW', 'BASIC', 'rtw-basic'),
]);
const profile2 = new AdvancedIdentityProfile('YOTI_GLOBAL', [
  new AdvancedIdentityProfileScheme('IDENTITY', 'AL_L1', 'identity-AL-L1'),
  new AdvancedIdentityProfileScheme('IDENTITY', 'AL_M1', 'identity-AL-M1'),
]);

describe('AdvancedIdentityProfileSchemeBuilder', () => {
  it('should build AdvancedIdentityProfileScheme (1 profile)', () => {
    const advancedIdentityProfileRequirements = new AdvancedIdentityProfileRequirementsBuilder()
      .withProfile(profile1)
      .build();

    expect(advancedIdentityProfileRequirements).toBeInstanceOf(AdvancedIdentityProfileRequirements);

    const expectedJson = JSON.stringify({
      profiles: [
        JSON.parse(JSON.stringify(profile1)),
      ],
    });

    expect(JSON.stringify(advancedIdentityProfileRequirements)).toBe(expectedJson);
  });
  it('should build AdvancedIdentityProfileScheme (2 profiles)', () => {
    const advancedIdentityProfileRequirements = new AdvancedIdentityProfileRequirementsBuilder()
      .withProfile(profile1)
      .withProfile(profile2)
      .build();

    expect(advancedIdentityProfileRequirements).toBeInstanceOf(AdvancedIdentityProfileRequirements);

    const expectedJson = JSON.stringify({
      profiles: [
        JSON.parse(JSON.stringify(profile1)),
        JSON.parse(JSON.stringify(profile2)),
      ],
    });

    expect(JSON.stringify(advancedIdentityProfileRequirements)).toBe(expectedJson);
  });

  describe('#withProfile', () => {
    it('should error when called with incorrect argument type', () => {
      expect(() => {
        new AdvancedIdentityProfileRequirementsBuilder()
          .withProfile({ not: 'a-profile' });
      }).toThrowError(TypeError);
    });
  });
});
