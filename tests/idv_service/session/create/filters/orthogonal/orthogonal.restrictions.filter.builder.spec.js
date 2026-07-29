const {
  OrthogonalRestrictionsFilterBuilder,
  AllowedProviderBuilder,
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

  it('should build OrthogonalRestrictionsFilter with expired document not allowed', () => {
    const orthogonalRestrictionsFilter = new OrthogonalRestrictionsFilterBuilder()
      .withBlacklistedDocumentTypes([SOME_DOCUMENT_TYPE, SOME_OTHER_DOCUMENT_TYPE])
      .withAllowExpiredDocuments(false)
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
        allow_expired_documents: false,
      }));
  });

  it('should build OrthogonalRestrictionsFilter with allow non latin documents', () => {
    const orthogonalRestrictionsFilter = new OrthogonalRestrictionsFilterBuilder()
      .withAllowNonLatinDocuments(true)
      .build();

    expect(JSON.stringify(orthogonalRestrictionsFilter))
      .toBe(JSON.stringify({
        type: 'ORTHOGONAL_RESTRICTIONS',
        allow_non_latin_documents: true,
      }));
  });

  it('should build OrthogonalRestrictionsFilter with allowed Digital IDs', () => {
    const orthogonalRestrictionsFilter = new OrthogonalRestrictionsFilterBuilder()
      .withAllowDigitalIds(true)
      .build();

    expect(JSON.stringify(orthogonalRestrictionsFilter))
      .toBe(JSON.stringify({
        type: 'ORTHOGONAL_RESTRICTIONS',
        allow_digital_ids: true,
      }));
  });

  it('should build OrthogonalRestrictionsFilter with allowed providers', () => {
    const orthogonalRestrictionsFilter = new OrthogonalRestrictionsFilterBuilder()
      .withAllowedProviders([
        new AllowedProviderBuilder().withName('provider1').build(),
        new AllowedProviderBuilder().withName('provider2').build(),
      ])
      .build();

    expect(JSON.stringify(orthogonalRestrictionsFilter))
      .toBe(JSON.stringify({
        type: 'ORTHOGONAL_RESTRICTIONS',
        allowed_providers: [{ name: 'provider1' }, { name: 'provider2' }],
      }));
  });
});
