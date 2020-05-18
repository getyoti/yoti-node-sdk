const {
  OrthogonalRestrictionsFilterBuilder,
} = require('../../../../../..');

const SOME_DOCUMENT_TYPE = 'some-document-type';
const SOME_OTHER_DOCUMENT_TYPE = 'some-other-document-type';
const SOME_COUNTRY_CODE = 'some-country-code';
const SOME_OTHER_COUNTRY_CODE = 'some-other-country-code';

describe('OrthogonalRestrictionsFilterBuilder', () => {
  it('should build OrthogonalRestrictionsFilter', () => {
    const orthogonalRestrictionsFilter = new OrthogonalRestrictionsFilterBuilder().build();

    expect(JSON.stringify(orthogonalRestrictionsFilter))
      .toBe(JSON.stringify({
        type: 'ORTHOGONAL_RESTRICTIONS',
      }));
  });

  it('should build OrthogonalRestrictionsFilter with country and type restrictions', () => {
    const orthogonalRestrictionsFilter = new OrthogonalRestrictionsFilterBuilder()
      .withWhitelistedCountries([SOME_COUNTRY_CODE, SOME_OTHER_COUNTRY_CODE])
      .withWhitelistedDocumentTypes([SOME_DOCUMENT_TYPE, SOME_OTHER_DOCUMENT_TYPE])
      .build();

    expect(JSON.stringify(orthogonalRestrictionsFilter))
      .toBe(JSON.stringify({
        type: 'ORTHOGONAL_RESTRICTIONS',
        country_restriction: {
          inclusion: 'WHITELIST',
          country_codes: [
            SOME_COUNTRY_CODE,
            SOME_OTHER_COUNTRY_CODE,
          ],
        },
        type_restriction: {
          inclusion: 'WHITELIST',
          document_types: [
            SOME_DOCUMENT_TYPE,
            SOME_OTHER_DOCUMENT_TYPE,
          ],
        },
      }));
  });

  it('should build OrthogonalRestrictionsFilter with whitelisted countries', () => {
    const orthogonalRestrictionsFilter = new OrthogonalRestrictionsFilterBuilder()
      .withWhitelistedCountries([SOME_COUNTRY_CODE, SOME_OTHER_COUNTRY_CODE])
      .build();

    expect(JSON.stringify(orthogonalRestrictionsFilter))
      .toBe(JSON.stringify({
        type: 'ORTHOGONAL_RESTRICTIONS',
        country_restriction: {
          inclusion: 'WHITELIST',
          country_codes: [
            SOME_COUNTRY_CODE,
            SOME_OTHER_COUNTRY_CODE,
          ],
        },
      }));
  });

  it('should build OrthogonalRestrictionsFilter with blacklisted countries', () => {
    const orthogonalRestrictionsFilter = new OrthogonalRestrictionsFilterBuilder()
      .withBlacklistedCountries([SOME_COUNTRY_CODE, SOME_OTHER_COUNTRY_CODE])
      .build();

    expect(JSON.stringify(orthogonalRestrictionsFilter))
      .toBe(JSON.stringify({
        type: 'ORTHOGONAL_RESTRICTIONS',
        country_restriction: {
          inclusion: 'BLACKLIST',
          country_codes: [
            SOME_COUNTRY_CODE,
            SOME_OTHER_COUNTRY_CODE,
          ],
        },
      }));
  });

  it('should build OrthogonalRestrictionsFilter with whitelisted document types', () => {
    const orthogonalRestrictionsFilter = new OrthogonalRestrictionsFilterBuilder()
      .withWhitelistedDocumentTypes([SOME_DOCUMENT_TYPE, SOME_OTHER_DOCUMENT_TYPE])
      .build();

    expect(JSON.stringify(orthogonalRestrictionsFilter))
      .toBe(JSON.stringify({
        type: 'ORTHOGONAL_RESTRICTIONS',
        type_restriction: {
          inclusion: 'WHITELIST',
          document_types: [
            SOME_DOCUMENT_TYPE,
            SOME_OTHER_DOCUMENT_TYPE,
          ],
        },
      }));
  });

  it('should build OrthogonalRestrictionsFilter with blacklisted document types', () => {
    const orthogonalRestrictionsFilter = new OrthogonalRestrictionsFilterBuilder()
      .withBlacklistedDocumentTypes([SOME_DOCUMENT_TYPE, SOME_OTHER_DOCUMENT_TYPE])
      .build();

    expect(JSON.stringify(orthogonalRestrictionsFilter))
      .toBe(JSON.stringify({
        type: 'ORTHOGONAL_RESTRICTIONS',
        type_restriction: {
          inclusion: 'BLACKLIST',
          document_types: [
            SOME_DOCUMENT_TYPE,
            SOME_OTHER_DOCUMENT_TYPE,
          ],
        },
      }));
  });
});
