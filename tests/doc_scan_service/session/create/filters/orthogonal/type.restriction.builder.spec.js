const {
  TypeRestrictionBuilder,
} = require('../../../../../..');

const SOME_DOCUMENT_TYPE = 'some-document-type';
const SOME_OTHER_DOCUMENT_TYPE = 'some-other-document-type';

describe('TypeRestrictionBuilder', () => {
  it('should build TypeRestriction for whitelist', () => {
    const typeRestriction = new TypeRestrictionBuilder()
      .forWhitelist()
      .build();

    expect(JSON.stringify(typeRestriction))
      .toBe(JSON.stringify({
        inclusion: 'WHITELIST',
        document_types: [],
      }));
  });

  it('should build TypeRestriction for blacklist', () => {
    const typeRestriction = new TypeRestrictionBuilder()
      .forBlacklist()
      .build();

    expect(JSON.stringify(typeRestriction))
      .toBe(JSON.stringify({
        inclusion: 'BLACKLIST',
        document_types: [],
      }));
  });

  it('should build TypeRestriction with type', () => {
    const typeRestriction = new TypeRestrictionBuilder()
      .forWhitelist()
      .withDocumentRestriction(SOME_DOCUMENT_TYPE)
      .withDocumentRestriction(SOME_OTHER_DOCUMENT_TYPE)
      .build();

    expect(JSON.stringify(typeRestriction))
      .toBe(JSON.stringify({
        inclusion: 'WHITELIST',
        document_types: [
          SOME_DOCUMENT_TYPE,
          SOME_OTHER_DOCUMENT_TYPE,
        ],
      }));
  });
});
