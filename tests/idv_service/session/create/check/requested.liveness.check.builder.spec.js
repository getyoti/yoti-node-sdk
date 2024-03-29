const { RequestedLivenessCheckBuilder } = require('../../../../../src/idv_service');

describe('RequestedLivenessCheckBuilder', () => {
  it('should build RequestedLivenessCheck for zoom liveness', () => {
    const expectedJson = JSON.stringify({
      type: 'LIVENESS',
      config: {
        max_retries: 1,
        liveness_type: 'ZOOM',
      },
    });

    const check = new RequestedLivenessCheckBuilder()
      .forZoomLiveness()
      .build();

    expect(JSON.stringify(check)).toBe(expectedJson);
  });

  it('should build RequestedLivenessCheck for static liveness', () => {
    const expectedJson = JSON.stringify({
      type: 'LIVENESS',
      config: {
        max_retries: 1,
        liveness_type: 'STATIC',
      },
    });

    const check = new RequestedLivenessCheckBuilder()
      .forStaticLiveness()
      .build();

    expect(JSON.stringify(check)).toBe(expectedJson);
  });

  it('should build RequestedLivenessCheck with custom retries', () => {
    const expectedJson = JSON.stringify({
      type: 'LIVENESS',
      config: {
        max_retries: 10,
        liveness_type: 'ZOOM',
      },
    });

    const check = new RequestedLivenessCheckBuilder()
      .withMaxRetries(10)
      .forZoomLiveness()
      .build();

    expect(JSON.stringify(check)).toBe(expectedJson);
  });
});
