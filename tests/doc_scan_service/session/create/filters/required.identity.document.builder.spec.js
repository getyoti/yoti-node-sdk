const {
  RequiredIdentityDocumentBuilder,
  OrthogonalRestrictionsFilterBuilder,
  DocumentRestrictionsFilterBuilder,
} = require('../../../../..');

describe('RequiredIdentityDocumentBuilder', () => {
  it('builds RequiredIdentityDocument without filter', () => {
    const requiredIdentityDocument = new RequiredIdentityDocumentBuilder()
      .build();

    expect(JSON.stringify(requiredIdentityDocument))
      .toBe(JSON.stringify({
        type: 'ID_DOCUMENT',
      }));
  });

  it('builds RequiredIdentityDocument with orthogonal filter', () => {
    const requiredIdentityDocument = new RequiredIdentityDocumentBuilder()
      .withFilter(new OrthogonalRestrictionsFilterBuilder().build())
      .build();

    expect(JSON.stringify(requiredIdentityDocument))
      .toBe(JSON.stringify({
        type: 'ID_DOCUMENT',
        filter: {
          type: 'ORTHOGONAL_RESTRICTIONS',
        },
      }));
  });

  it('builds RequiredIdentityDocument with document filter', () => {
    const requiredIdentityDocument = new RequiredIdentityDocumentBuilder()
      .withFilter(new DocumentRestrictionsFilterBuilder().forWhitelist().build())
      .build();

    expect(JSON.stringify(requiredIdentityDocument))
      .toBe(JSON.stringify({
        type: 'ID_DOCUMENT',
        filter: {
          type: 'DOCUMENT_RESTRICTIONS',
          inclusion: 'WHITELIST',
          documents: [],
        },
      }));
  });
});
