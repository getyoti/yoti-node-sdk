const { RequestedTextExtractionTaskBuilder } = require('../../../../../src/doc_scan_service');

describe('RequestedTextExtractionBuilder', () => {
  it('should build RequestedTextExtractionTask with manual check always', () => {
    const expectedJson = JSON.stringify({
      type: 'ID_DOCUMENT_TEXT_DATA_EXTRACTION',
      config: {
        manual_check: 'ALWAYS',
      },
    });

    const task = new RequestedTextExtractionTaskBuilder()
      .withManualCheckAlways()
      .build();

    expect(JSON.stringify(task)).toBe(expectedJson);
  });

  it('should build RequestedTextExtractionTask with manual check fallback', () => {
    const expectedJson = JSON.stringify({
      type: 'ID_DOCUMENT_TEXT_DATA_EXTRACTION',
      config: {
        manual_check: 'FALLBACK',
      },
    });

    const task = new RequestedTextExtractionTaskBuilder()
      .withManualCheckFallback()
      .build();

    expect(JSON.stringify(task)).toBe(expectedJson);
  });

  it('should build RequestedTextExtractionTask with manual check never', () => {
    const expectedJson = JSON.stringify({
      type: 'ID_DOCUMENT_TEXT_DATA_EXTRACTION',
      config: {
        manual_check: 'NEVER',
      },
    });

    const task = new RequestedTextExtractionTaskBuilder()
      .withManualCheckNever()
      .build();

    expect(JSON.stringify(task)).toBe(expectedJson);
  });
});
