const IdentityProfileBuilder = require('../../../../src/doc_scan_service/session/create/identity.profile.builder');
const IdentityProfileConfig = require('../../../../src/doc_scan_service/session/create/identity.profile.config');

describe('RequestedIdentityProfileBuilder', () => {
  it('should build IdentityProfileConfig', () => {
    const identityProfileConfig = new IdentityProfileBuilder()
      .withScheme('DBS', 'STANDARD')
      .withTrustFramework('UK_TFIDA')
      .build();

    const expectedJson = JSON.stringify({
      trust_framework: 'UK_TFIDA',
      scheme: {
        type: 'DBS',
        objective: 'STANDARD',
      },
    });

    expect(identityProfileConfig).toBeInstanceOf(IdentityProfileConfig);
    expect(JSON.stringify(identityProfileConfig)).toBe(expectedJson);
  });

  it('should build IdentityProfileBuilder without scheme objective', () => {
    const identityProfileConfig = new IdentityProfileBuilder()
      .withTrustFramework('UK_TFIDA')
      .withScheme('RTW')
      .build();

    const expectedJson = JSON.stringify({
      trust_framework: 'UK_TFIDA',
      scheme: {
        type: 'RTW',
      },
    });
    expect(JSON.stringify(identityProfileConfig)).toBe(expectedJson);
  });
});
