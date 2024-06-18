const AdvancedIdentityProfileSchemeBuilder = require('../../../../../../src/idv_service/session/create/identity_profile/advanced/advanced.identity.profile.scheme.builder');
const AdvancedIdentityProfileScheme = require('../../../../../../src/idv_service/session/create/identity_profile/advanced/advanced.identity.profile.scheme');
const AdvancedIdentityProfileSchemeConfigBuilder = require('../../../../../../src/idv_service/session/create/identity_profile/advanced/advanced.identity.profile.scheme.config.builder');
const OrthogonalRestrictionsFilterBuilder = require('../../../../../../src/idv_service/session/create/filters/orthogonal/orthogonal.restrictions.filter.builder');

describe('AdvancedIdentityProfileSchemeBuilder', () => {
  it('should build AdvancedIdentityProfileScheme (without config)', () => {
    const advancedIdentityProfileScheme = new AdvancedIdentityProfileSchemeBuilder()
      .withType('DBS')
      .withObjective('STANDARD')
      .withLabel('dbs-standard')
      .build();

    expect(advancedIdentityProfileScheme).toBeInstanceOf(AdvancedIdentityProfileScheme);

    const expectedJson = JSON.stringify({
      type: 'DBS',
      objective: 'STANDARD',
      label: 'dbs-standard',
    });

    expect(JSON.stringify(advancedIdentityProfileScheme)).toBe(expectedJson);
  });
  it('should build AdvancedIdentityProfileScheme (without config, nor objective, nor label)', () => {
    const advancedIdentityProfileScheme = new AdvancedIdentityProfileSchemeBuilder()
      .withType('RTW')
      .build();

    expect(advancedIdentityProfileScheme).toBeInstanceOf(AdvancedIdentityProfileScheme);

    const expectedJson = JSON.stringify({
      type: 'RTW',
    });

    expect(JSON.stringify(advancedIdentityProfileScheme)).toBe(expectedJson);
  });
  it('should build AdvancedIdentityProfileScheme (with config)', () => {
    const documentFilter = new OrthogonalRestrictionsFilterBuilder()
      .withWhitelistedDocumentTypes(['DRIVING_LICENCE'])
      .withAllowNonLatinDocuments(true)
      .build();

    const advancedIdentityProfileSchemeConfig = new AdvancedIdentityProfileSchemeConfigBuilder()
      .withFilter(documentFilter)
      .build();

    const advancedIdentityProfileScheme = new AdvancedIdentityProfileSchemeBuilder()
      .withType('DBS')
      .withObjective('STANDARD')
      .withLabel('dbs-standard')
      .withConfig(advancedIdentityProfileSchemeConfig)
      .build();

    expect(advancedIdentityProfileScheme).toBeInstanceOf(AdvancedIdentityProfileScheme);

    const expectedJson = JSON.stringify({
      type: 'DBS',
      objective: 'STANDARD',
      label: 'dbs-standard',
      config: JSON.parse(JSON.stringify(advancedIdentityProfileSchemeConfig)),
    });

    expect(JSON.stringify(advancedIdentityProfileScheme)).toBe(expectedJson);
  });
  describe('#withType', () => {
    it('should error when called with incorrect argument type', () => {
      expect(() => {
        new AdvancedIdentityProfileSchemeBuilder()
          .withType(123);
      }).toThrowError(TypeError);
    });
  });
  describe('#withLabel', () => {
    it('should error when called with incorrect argument type', () => {
      expect(() => {
        new AdvancedIdentityProfileSchemeBuilder()
          .withLabel(123);
      }).toThrowError(TypeError);
    });
  });
  describe('#withObjective', () => {
    it('should error when called with incorrect argument type', () => {
      expect(() => {
        new AdvancedIdentityProfileSchemeBuilder()
          .withObjective(123);
      }).toThrowError(TypeError);
    });
  });
  describe('#withConfig', () => {
    it('should error when called with incorrect argument type', () => {
      expect(() => {
        new AdvancedIdentityProfileSchemeBuilder()
          .withConfig(123);
      }).toThrowError(TypeError);
    });
  });
});
