const {
  DocumentRestrictionsFilterBuilder,
  DocumentRestrictionBuilder,
} = require('../../../../../..');

const SOME_DOCUMENT_TYPE = 'some-document-type';

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
      .withDocumentType(SOME_DOCUMENT_TYPE)
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
});
