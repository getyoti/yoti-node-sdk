const CreateSessionOverviewPdfPayload = require('../../../../../src/idv_service/session/create/pdf/create.session.overview.pdf.payload');

describe('CreateSessionOverviewPdfPayload', () => {
  it('should build with default values', () => {
    expect(() => {
      // eslint-disable-next-line no-unused-vars
      const payload = new CreateSessionOverviewPdfPayload();
    }).not.toThrow(TypeError);
  });

  it('should throw an TypeError when the includeImages parameter is not a boolean', () => {
    expect(() => {
      // eslint-disable-next-line no-unused-vars
      const payload = new CreateSessionOverviewPdfPayload(123, false, false);
    }).toThrow(TypeError);
  });

  it('should throw an TypeError when the includeExtractedText parameter is not a boolean', () => {
    expect(() => {
      // eslint-disable-next-line no-unused-vars
      const payload = new CreateSessionOverviewPdfPayload(false, 123, false);
    }).toThrow(TypeError);
  });

  it('should throw an TypeError when the includeDeviceTracking parameter is not a boolean', () => {
    expect(() => {
      // eslint-disable-next-line no-unused-vars
      const payload = new CreateSessionOverviewPdfPayload(false, false, 123);
    }).toThrow(TypeError);
  });

  it('should serialize to JSON correctly', () => {
    let payload = new CreateSessionOverviewPdfPayload();

    let expectedJson = JSON.stringify({
      options: {
        include_images: undefined,
        include_extracted_text: undefined,
        include_device_tracking: undefined,
      },
    });

    expect(JSON.stringify(payload)).toBe(expectedJson);

    payload = new CreateSessionOverviewPdfPayload(true, true, false);

    expectedJson = JSON.stringify({
      options: {
        include_images: true,
        include_extracted_text: true,
        include_device_tracking: false,
      },
    });

    expect(JSON.stringify(payload)).toBe(expectedJson);
  });
});
