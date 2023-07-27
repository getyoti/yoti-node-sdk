const { RequestedFaceComparisonCheckBuilder } = require('../../../../../src/idv_service');

describe('RequestedFaceComparisonCheckBuilder', () => {
  it('should build RequestedFaceComparisonCheck with manual check never', () => {
    const expectedJson = JSON.stringify({
      type: 'FACE_COMPARISON',
      config: {
        manual_check: 'NEVER',
      },
    });

    const check = new RequestedFaceComparisonCheckBuilder()
      .withManualCheckNever()
      .build();

    expect(JSON.stringify(check)).toBe(expectedJson);
  });
});
