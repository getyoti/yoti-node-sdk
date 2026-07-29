const {
  AllowedProviderBuilder,
} = require('../../../../..');

const AllowedProvider = require('../../../../../src/idv_service/session/create/filters/allowed.provider');

describe('AllowedProviderBuilder', () => {
  it('builds instance of AllowedProvider (when name is specified)', () => {
    const allowedProvider = new AllowedProviderBuilder()
      .withName('some-provider')
      .build();

    expect(allowedProvider).toBeInstanceOf(AllowedProvider);

    expect(JSON.stringify(allowedProvider))
      .toBe(JSON.stringify({
        name: 'some-provider',
      }));
  });

  it('throws when name is NOT specified', () => {
    expect(() => {
      new AllowedProviderBuilder().build();
    }).toThrow('name must be a string');
  });
});
