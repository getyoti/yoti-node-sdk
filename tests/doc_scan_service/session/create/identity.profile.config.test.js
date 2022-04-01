const IdentityProfileConfig = require('../../../../src/doc_scan_service/session/create/identity.profile.config');

describe('IdentityProfileConfig', () => {
  it('Should serialize with scheme objective when provided', () => {
    const identityProfileConfig = new IdentityProfileConfig(
      'UK_TFIDA',
      {
        type: 'DBS',
        objective: 'BASIC',
      }
    );

    const expectedJson = JSON.stringify({
      trust_framework: 'UK_TFIDA',
      scheme: {
        type: 'DBS',
        objective: 'BASIC',
      },
    });

    expect(JSON.stringify(identityProfileConfig)).toBe(expectedJson);
  });
  it('Should fail without scheme objective when type is "DBS"', () => {
    expect(() => {
      // eslint-disable-next-line no-new
      new IdentityProfileConfig(
        'UK_TFIDA',
        {
          type: 'DBS',
        }
      );
    }).toThrow(new TypeError('scheme objective cannot be null or empty'));
  });
});
