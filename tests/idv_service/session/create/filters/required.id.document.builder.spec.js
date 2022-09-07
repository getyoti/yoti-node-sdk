const {
  RequiredIdDocumentBuilder,
  OrthogonalRestrictionsFilterBuilder,
  DocumentRestrictionsFilterBuilder,
} = require('../../../../..');

describe('RequiredIdDocumentBuilder', () => {
  it('builds RequiredIdDocument without filter', () => {
    const requiredIdDocument = new RequiredIdDocumentBuilder()
      .build();

    expect(JSON.stringify(requiredIdDocument))
      .toBe(JSON.stringify({
        type: 'ID_DOCUMENT',
      }));
  });

  it('builds RequiredIdDocument with orthogonal filter', () => {
    const requiredIdDocument = new RequiredIdDocumentBuilder()
      .withFilter(new OrthogonalRestrictionsFilterBuilder().build())
      .build();

    expect(JSON.stringify(requiredIdDocument))
      .toBe(JSON.stringify({
        type: 'ID_DOCUMENT',
        filter: {
          type: 'ORTHOGONAL_RESTRICTIONS',
        },
      }));
  });

  it('builds RequiredIdDocument with document filter', () => {
    const requiredIdDocument = new RequiredIdDocumentBuilder()
      .withFilter(new DocumentRestrictionsFilterBuilder().forWhitelist().build())
      .build();

    expect(JSON.stringify(requiredIdDocument))
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
