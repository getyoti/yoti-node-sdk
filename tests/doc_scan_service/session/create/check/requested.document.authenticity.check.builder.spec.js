const { RequestedDocumentAuthenticityCheckBuilder } = require('../../../../../src/doc_scan_service');

describe('RequestedDocumentAuthenticityCheckBuilder', () => {
  it('should build RequestedDocumentAuthenticityCheck', () => {
    const expectedJson = JSON.stringify({
      type: 'ID_DOCUMENT_AUTHENTICITY',
    });

    const check = new RequestedDocumentAuthenticityCheckBuilder().build();

    expect(JSON.stringify(check)).toBe(expectedJson);
  });
});
