const { RequestedIdDocumentComparisonCheckBuilder } = require('../../../../..');

describe('RequestedIdDocumentComparisonCheckBuilder', () => {
  it('should build RequestedIdDocumentComparisonCheck', () => {
    const expectedJson = JSON.stringify({
      type: 'ID_DOCUMENT_COMPARISON',
      config: {},
    });

    const check = new RequestedIdDocumentComparisonCheckBuilder().build();

    expect(JSON.stringify(check)).toBe(expectedJson);
  });
});
