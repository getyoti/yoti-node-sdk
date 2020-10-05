const { RequestedDocumentAuthenticityCheckBuilder } = require('../../../../../src/doc_scan_service');

describe('RequestedDocumentAuthenticityCheckBuilder', () => {
  it('should build RequestedDocumentAuthenticityCheck', () => {
    const expectedJson = JSON.stringify({
      type: 'ID_DOCUMENT_AUTHENTICITY',
      config: {},
    });

    const check = new RequestedDocumentAuthenticityCheckBuilder().build();

    expect(JSON.stringify(check)).toBe(expectedJson);
  });

  it('should build RequestedDocumentAuthenticityCheck with manual check always', () => {
    const expectedJson = JSON.stringify({
      type: 'ID_DOCUMENT_AUTHENTICITY',
      config: {
        manual_check: 'ALWAYS',
      },
    });

    const check = new RequestedDocumentAuthenticityCheckBuilder()
      .withManualCheckAlways()
      .build();

    expect(JSON.stringify(check)).toBe(expectedJson);
  });

  it('should build RequestedDocumentAuthenticityCheck with manual check fallback', () => {
    const expectedJson = JSON.stringify({
      type: 'ID_DOCUMENT_AUTHENTICITY',
      config: {
        manual_check: 'FALLBACK',
      },
    });

    const check = new RequestedDocumentAuthenticityCheckBuilder()
      .withManualCheckFallback()
      .build();

    expect(JSON.stringify(check)).toBe(expectedJson);
  });

  it('should build RequestedDocumentAuthenticityCheck with manual check never', () => {
    const expectedJson = JSON.stringify({
      type: 'ID_DOCUMENT_AUTHENTICITY',
      config: {
        manual_check: 'NEVER',
      },
    });

    const check = new RequestedDocumentAuthenticityCheckBuilder()
      .withManualCheckNever()
      .build();

    expect(JSON.stringify(check)).toBe(expectedJson);
  });
});
