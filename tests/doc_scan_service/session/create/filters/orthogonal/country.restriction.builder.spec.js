const {
  CountryRestrictionBuilder,
} = require('../../../../../..');

const SOME_COUNTRY_CODE = 'some-country-code';
const SOME_OTHER_COUNTRY_CODE = 'some-other-country-code';

describe('CountryRestrictionBuilder', () => {
  it('should build CountryRestriction for whitelist', () => {
    const typeRestriction = new CountryRestrictionBuilder()
      .forWhitelist()
      .build();

    expect(JSON.stringify(typeRestriction))
      .toBe(JSON.stringify({
        inclusion: 'WHITELIST',
        country_codes: [],
      }));
  });

  it('should build CountryRestriction for blacklist', () => {
    const typeRestriction = new CountryRestrictionBuilder()
      .forBlacklist()
      .build();

    expect(JSON.stringify(typeRestriction))
      .toBe(JSON.stringify({
        inclusion: 'BLACKLIST',
        country_codes: [],
      }));
  });

  it('should build CountryRestriction with country code', () => {
    const typeRestriction = new CountryRestrictionBuilder()
      .forWhitelist()
      .withCountryCode(SOME_COUNTRY_CODE)
      .withCountryCode(SOME_OTHER_COUNTRY_CODE)
      .build();

    expect(JSON.stringify(typeRestriction))
      .toBe(JSON.stringify({
        inclusion: 'WHITELIST',
        country_codes: [
          SOME_COUNTRY_CODE,
          SOME_OTHER_COUNTRY_CODE,
        ],
      }));
  });
});
