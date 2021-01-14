const { RequestedThirdPartyIdentityCheckBuilder } = require('../../../../..');

describe('RequestedThirdPartyIdentityCheckBuilder', () => {
  it('should build RequestedThirdPartyIdentityCheck', () => {
    const expectedJson = JSON.stringify({
      type: 'THIRD_PARTY_IDENTITY',
      config: {},
    });

    const check = new RequestedThirdPartyIdentityCheckBuilder().build();

    expect(JSON.stringify(check)).toBe(expectedJson);
  });
});
