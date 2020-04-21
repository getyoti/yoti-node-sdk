const {
  RequiredIdDocumentBuilder,
  OrthogonalRestrictionsFilterBuilder,
  DocumentRestrictionsFilterBuilder,
} = require('../../../../..');

describe('RequiredIdDocumentBuilder', () => {
  it('builds RequiredIdentityDocument without filter', () => {
    const requiredIdentityDocument = new RequiredIdDocumentBuilder()
      .build();

    expect(JSON.stringify(requiredIdentityDocument))
      .toBe(JSON.stringify({
        type: 'ID_DOCUMENT',
      }));
  });

  it('builds RequiredIdentityDocument with orthogonal filter', () => {
    const requiredIdentityDocument = new RequiredIdDocumentBuilder()
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
    const requiredIdentityDocument = new RequiredIdDocumentBuilder()
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
