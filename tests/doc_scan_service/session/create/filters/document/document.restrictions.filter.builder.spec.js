const {
  DocumentRestrictionsFilterBuilder,
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

  it('should build DocumentRestrictionsFilter with document type', () => {
    const documentRestrictionsFilter = new DocumentRestrictionsFilterBuilder()
      .forWhitelist()
      .withDocumentRestriction([], [SOME_DOCUMENT_TYPE])
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

  it('should build DocumentRestrictionsFilter with multiple document types', () => {
    const documentRestrictionsFilter = new DocumentRestrictionsFilterBuilder()
      .forWhitelist()
      .withDocumentRestriction(null, [SOME_DOCUMENT_TYPE, SOME_OTHER_DOCUMENT_TYPE])
      .build();

    expect(JSON.stringify(documentRestrictionsFilter))
      .toBe(JSON.stringify({
        type: 'DOCUMENT_RESTRICTIONS',
        inclusion: 'WHITELIST',
        documents: [
          {
            document_types: [
              SOME_DOCUMENT_TYPE,
              SOME_OTHER_DOCUMENT_TYPE,
            ],
          },
        ],
      }));
  });

  it('should build DocumentRestrictionsFilter with country restriction', () => {
    const documentRestrictionsFilter = new DocumentRestrictionsFilterBuilder()
      .forWhitelist()
      .withDocumentRestriction([SOME_COUNTRY_CODE], [])
      .build();

    expect(JSON.stringify(documentRestrictionsFilter))
      .toBe(JSON.stringify({
        type: 'DOCUMENT_RESTRICTIONS',
        inclusion: 'WHITELIST',
        documents: [
          {
            country_codes: [
              SOME_COUNTRY_CODE,
            ],
          },
        ],
      }));
  });

  it('should build DocumentRestrictionsFilter with multiple countries', () => {
    const documentRestrictionsFilter = new DocumentRestrictionsFilterBuilder()
      .forWhitelist()
      .withDocumentRestriction([SOME_COUNTRY_CODE, SOME_OTHER_COUNTRY_CODE], [])
      .build();

    expect(JSON.stringify(documentRestrictionsFilter))
      .toBe(JSON.stringify({
        type: 'DOCUMENT_RESTRICTIONS',
        inclusion: 'WHITELIST',
        documents: [
          {
            country_codes: [
              SOME_COUNTRY_CODE,
              SOME_OTHER_COUNTRY_CODE,
            ],
          },
        ],
      }));
  });

  it('should build DocumentRestrictionsFilter with multiple document restrictions', () => {
    const documentRestrictionsFilter = new DocumentRestrictionsFilterBuilder()
      .forWhitelist()
      .withDocumentRestriction([SOME_COUNTRY_CODE], [SOME_DOCUMENT_TYPE])
      .withDocumentRestriction([SOME_OTHER_COUNTRY_CODE], [SOME_OTHER_DOCUMENT_TYPE])
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
