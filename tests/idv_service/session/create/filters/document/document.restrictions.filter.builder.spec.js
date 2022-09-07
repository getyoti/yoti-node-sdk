const {
  DocumentRestrictionsFilterBuilder,
  DocumentRestrictionBuilder,
} = require('../../../../../..');

const SOME_DOCUMENT_TYPE = 'some-document-type';
const SOME_OTHER_DOCUMENT_TYPE = 'some-other-document-type';
const SOME_COUNTRY_CODE = 'some-country-code';
const SOME_OTHER_COUNTRY_CODE = 'some-other-country-code';

describe('DocumentRestrictionsFilterBuilder', () => {
  it('should build DocumentRestrictionsFilter for whitelist', () => {
    const documentRestrictionsFilter = new DocumentRestrictionsFilterBuilder()
      .forWhitelist()
      .build();

    expect(JSON.stringify(documentRestrictionsFilter))
      .toBe(JSON.stringify({
        type: 'DOCUMENT_RESTRICTIONS',
        inclusion: 'WHITELIST',
        documents: [],
      }));
  });

  it('should build DocumentRestrictionsFilter for blacklist', () => {
    const documentRestrictionsFilter = new DocumentRestrictionsFilterBuilder()
      .forBlacklist()
      .build();

    expect(JSON.stringify(documentRestrictionsFilter))
      .toBe(JSON.stringify({
        type: 'DOCUMENT_RESTRICTIONS',
        inclusion: 'BLACKLIST',
        documents: [],
      }));
  });

  it('should build DocumentRestrictionsFilter with document restriction', () => {
    const documentRestriction = new DocumentRestrictionBuilder()
      .withDocumentTypes([SOME_DOCUMENT_TYPE])
      .build();

    const documentRestrictionsFilter = new DocumentRestrictionsFilterBuilder()
      .forWhitelist()
      .withDocumentRestriction(documentRestriction)
      .build();

    expect(JSON.stringify(documentRestrictionsFilter))
      .toBe(JSON.stringify({
        type: 'DOCUMENT_RESTRICTIONS',
        inclusion: 'WHITELIST',
        documents: [
          {
            document_types: [
              SOME_DOCUMENT_TYPE,
            ],
          },
        ],
      }));
  });

  it('should build DocumentRestrictionsFilter with multiple document restrictions', () => {
    const someRestriction = new DocumentRestrictionBuilder()
      .withCountries([SOME_COUNTRY_CODE])
      .withDocumentTypes([SOME_DOCUMENT_TYPE])
      .build();

    const someOtherRestriction = new DocumentRestrictionBuilder()
      .withCountries([SOME_OTHER_COUNTRY_CODE])
      .withDocumentTypes([SOME_OTHER_DOCUMENT_TYPE])
      .build();

    const documentRestrictionsFilter = new DocumentRestrictionsFilterBuilder()
      .forWhitelist()
      .withDocumentRestriction(someRestriction)
      .withDocumentRestriction(someOtherRestriction)
      .build();

    expect(JSON.stringify(documentRestrictionsFilter))
      .toBe(JSON.stringify({
        type: 'DOCUMENT_RESTRICTIONS',
        inclusion: 'WHITELIST',
        documents: [
          {
            document_types: [
              SOME_DOCUMENT_TYPE,
            ],
            country_codes: [
              SOME_COUNTRY_CODE,
            ],
          },
          {
            document_types: [
              SOME_OTHER_DOCUMENT_TYPE,
            ],
            country_codes: [
              SOME_OTHER_COUNTRY_CODE,
            ],
          },
        ],
      }));
  });
});
