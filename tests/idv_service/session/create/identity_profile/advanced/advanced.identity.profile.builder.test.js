const AdvancedIdentityProfile = require('../../../../../../src/idv_service/session/create/identity_profile/advanced/advanced.identity.profile');
const AdvancedIdentityProfileBuilder = require('../../../../../../src/idv_service/session/create/identity_profile/advanced/advanced.identity.profile.builder');
const AdvancedIdentityProfileSchemeBuilder = require('../../../../../../src/idv_service/session/create/identity_profile/advanced/advanced.identity.profile.scheme.builder');
const AdvancedIdentityProfileSchemeConfigBuilder = require('../../../../../../src/idv_service/session/create/identity_profile/advanced/advanced.identity.profile.scheme.config.builder');
const OrthogonalRestrictionsFilterBuilder = require('../../../../../../src/idv_service/session/create/filters/orthogonal/orthogonal.restrictions.filter.builder');

function getScheme(type = 'DBS', objective = 'STANDARD', label = 'dbs-standard', filterDocumentType = null) {
  const builder = new AdvancedIdentityProfileSchemeBuilder()
    .withType(type);
  if (objective) builder.withObjective(objective);
  if (label) builder.withLabel(label);

  if (filterDocumentType) {
    const documentFilter = new OrthogonalRestrictionsFilterBuilder()
      .withWhitelistedDocumentTypes([filterDocumentType])
      .withAllowNonLatinDocuments(true)
      .build();
    const advancedIdentityProfileSchemeConfig = new AdvancedIdentityProfileSchemeConfigBuilder()
      .withFilter(documentFilter)
      .build();

    builder.withConfig(advancedIdentityProfileSchemeConfig);
  }

  return builder.build();
}

describe('AdvancedIdentityProfileSchemeBuilder', () => {
  it('should build AdvancedIdentityProfileScheme (1 scheme)', () => {
    const scheme = getScheme();
    const advancedIdentityProfile = new AdvancedIdentityProfileBuilder()
      .withTrustFramework('UK_TFIDA')
      .withScheme(scheme)
      .build();

    expect(advancedIdentityProfile).toBeInstanceOf(AdvancedIdentityProfile);

    const expectedJson = JSON.stringify({
      trust_framework: 'UK_TFIDA',
      schemes: [
        JSON.parse(JSON.stringify(scheme)),
      ],
    });

    expect(JSON.stringify(advancedIdentityProfile)).toBe(expectedJson);
  });

  it('should build AdvancedIdentityProfileScheme (2 schemes)', () => {
    const scheme1 = getScheme();
    const scheme2 = getScheme('RTW', null, null, 'PASSPORT');
    const advancedIdentityProfile = new AdvancedIdentityProfileBuilder()
      .withTrustFramework('UK_TFIDA')
      .withScheme(scheme1)
      .withScheme(scheme2)
      .build();

    expect(advancedIdentityProfile).toBeInstanceOf(AdvancedIdentityProfile);

    const expectedJson = JSON.stringify({
      trust_framework: 'UK_TFIDA',
      schemes: [
        JSON.parse(JSON.stringify(scheme1)),
        JSON.parse(JSON.stringify(scheme2)),
      ],
    });

    expect(JSON.stringify(advancedIdentityProfile)).toBe(expectedJson);
  });

  describe('#withTrustFramework', () => {
    it('should error when called with incorrect argument type', () => {
      expect(() => {
        new AdvancedIdentityProfileBuilder()
          .withTrustFramework(123);
      }).toThrowError(TypeError);
    });
  });

  describe('#withTrustFramework', () => {
    it('should error when called with incorrect argument type', () => {
      expect(() => {
        new AdvancedIdentityProfileBuilder()
          .withScheme({ not: 'a-scheme' });
      }).toThrowError(TypeError);
    });
  });
});
