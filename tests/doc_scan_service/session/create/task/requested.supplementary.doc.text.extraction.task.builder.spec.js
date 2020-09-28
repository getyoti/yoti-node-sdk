const { RequestedSupplementaryDocTextExtractionTaskBuilder } = require('../../../../../src/doc_scan_service');

const SUPPLEMENTARY_DOCUMENT_TEXT_DATA_EXTRACTION = 'SUPPLEMENTARY_DOCUMENT_TEXT_DATA_EXTRACTION';

describe('RequestedSupplementaryTextExtractionTaskBuilder', () => {
  it('should build RequestedSupplementaryTextExtractionTask with manual check always', () => {
    const expectedJson = JSON.stringify({
      type: SUPPLEMENTARY_DOCUMENT_TEXT_DATA_EXTRACTION,
      config: {
        manual_check: 'ALWAYS',
      },
    });

    const task = new RequestedSupplementaryDocTextExtractionTaskBuilder()
      .withManualCheckAlways()
      .build();

    expect(JSON.stringify(task)).toBe(expectedJson);
  });

  it('should build RequestedSupplementaryTextExtractionTask with manual check fallback', () => {
    const expectedJson = JSON.stringify({
      type: SUPPLEMENTARY_DOCUMENT_TEXT_DATA_EXTRACTION,
      config: {
        manual_check: 'FALLBACK',
      },
    });

    const task = new RequestedSupplementaryDocTextExtractionTaskBuilder()
      .withManualCheckFallback()
      .build();

    expect(JSON.stringify(task)).toBe(expectedJson);
  });

  it('should build RequestedSupplementaryTextExtractionTask with manual check never', () => {
    const expectedJson = JSON.stringify({
      type: SUPPLEMENTARY_DOCUMENT_TEXT_DATA_EXTRACTION,
      config: {
        manual_check: 'NEVER',
      },
    });

    const task = new RequestedSupplementaryDocTextExtractionTaskBuilder()
      .withManualCheckNever()
      .build();

    expect(JSON.stringify(task)).toBe(expectedJson);
  });
});
