const AdvancedIdentityProfileSchemeConfigBuilder = require('../../../../../../src/idv_service/session/create/identity_profile/advanced/advanced.identity.profile.scheme.config.builder');
const AdvancedIdentityProfileSchemeConfig = require('../../../../../../src/idv_service/session/create/identity_profile/advanced/advanced.identity.profile.scheme.config');
const OrthogonalRestrictionsFilterBuilder = require('../../../../../../src/idv_service/session/create/filters/orthogonal/orthogonal.restrictions.filter.builder');

describe('AdvancedIdentityProfileSchemeConfigBuilder', () => {
  it('should build AdvancedIdentityProfileSchemeConfig (no filter)', () => {
    const advancedIdentityProfileSchemeConfig = new AdvancedIdentityProfileSchemeConfigBuilder()
      .build();

    expect(advancedIdentityProfileSchemeConfig).toBeInstanceOf(AdvancedIdentityProfileSchemeConfig);

    const expectedJson = JSON.stringify({});

    expect(JSON.stringify(advancedIdentityProfileSchemeConfig)).toBe(expectedJson);
  });

  describe('#withFilter()', () => {
    it('should build AdvancedIdentityProfileSchemeConfig', () => {
      const documentFilter = new OrthogonalRestrictionsFilterBuilder()
        .withWhitelistedDocumentTypes(['DRIVING_LICENCE'])
        .withAllowNonLatinDocuments(true)
        .build();

      const advancedIdentityProfileSchemeConfig = new AdvancedIdentityProfileSchemeConfigBuilder()
        .withFilter(documentFilter)
        .build();

      expect(advancedIdentityProfileSchemeConfig)
        .toBeInstanceOf(AdvancedIdentityProfileSchemeConfig);

      const expectedJson = JSON.stringify({
        filter: JSON.parse(JSON.stringify(documentFilter)),
      });

      expect(JSON.stringify(advancedIdentityProfileSchemeConfig)).toBe(expectedJson);
    });
    it('should error when argument is not a filter', () => {
      expect(() => {
        new AdvancedIdentityProfileSchemeConfigBuilder()
          .withFilter({ fake: 'filter' })
          .build();
      }).toThrowError(TypeError);
    });
  });
});
