const { RequestedFaceMatchCheckBuilder } = require('../../../../../src/doc_scan_service');

describe('RequestedFaceMatchCheckBuilder', () => {
  it('should build RequestedFaceMatchCheck with manual check always', () => {
    const expectedJson = JSON.stringify({
      type: 'ID_DOCUMENT_FACE_MATCH',
      config: {
        manual_check: 'ALWAYS',
      },
    });

    const check = new RequestedFaceMatchCheckBuilder()
      .withManualCheckAlways()
      .build();

    expect(JSON.stringify(check)).toBe(expectedJson);
  });

  it('should build RequestedFaceMatchCheck with manual check fallback', () => {
    const expectedJson = JSON.stringify({
      type: 'ID_DOCUMENT_FACE_MATCH',
      config: {
        manual_check: 'FALLBACK',
      },
    });

    const check = new RequestedFaceMatchCheckBuilder()
      .withManualCheckFallback()
      .build();

    expect(JSON.stringify(check)).toBe(expectedJson);
  });

  it('should build RequestedFaceMatchCheck with manual check never', () => {
    const expectedJson = JSON.stringify({
      type: 'ID_DOCUMENT_FACE_MATCH',
      config: {
        manual_check: 'NEVER',
      },
    });

    const check = new RequestedFaceMatchCheckBuilder()
      .withManualCheckNever()
      .build();

    expect(JSON.stringify(check)).toBe(expectedJson);
  });
});
