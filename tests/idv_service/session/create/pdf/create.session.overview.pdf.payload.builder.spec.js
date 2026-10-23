const CreateSessionOverviewPdfPayload = require('../../../../../src/idv_service/session/create/pdf/create.session.overview.pdf.payload');
const CreateSessionOverviewPdfPayloadBuilder = require('../../../../../src/idv_service/session/create/pdf/create.session.overview.pdf.payload.builder');

describe('CreateFaceCaptureResourcePayload', () => {
  it('should throw an TypeError when the includeImages parameter is not a boolean', () => {
    expect(() => {
      new CreateSessionOverviewPdfPayloadBuilder()
        .withIncludeImages(123)
        .build();
    }).toThrow(TypeError);
  });

  it('should throw an TypeError when the includeExtractedText in parameter is not a boolean', () => {
    expect(() => {
      new CreateSessionOverviewPdfPayloadBuilder()
        .withIncludeExtractedText(123)
        .build();
    }).toThrow(TypeError);
  });

  it('should throw an TypeError when the includeDeviceTracking in parameter is not a boolean', () => {
    expect(() => {
      new CreateSessionOverviewPdfPayloadBuilder()
        .withIncludeDeviceTracking(123)
        .build();
    }).toThrow(TypeError);
  });

  it('should build a corresponding CreateSessionOverviewPdfPayload', () => {
    let payload = new CreateSessionOverviewPdfPayloadBuilder()
      .build();

    expect(payload).toBeInstanceOf(CreateSessionOverviewPdfPayload);

    let expectedJson = JSON.stringify({
      options: {
        include_images: undefined,
        include_extracted_text: undefined,
        include_device_tracking: undefined,
      },
    });

    expect(JSON.stringify(payload)).toBe(expectedJson);

    payload = new CreateSessionOverviewPdfPayloadBuilder()
      .withIncludeImages(true)
      .withIncludeExtractedText(true)
      .withIncludeDeviceTracking(false)
      .build();

    expect(payload).toBeInstanceOf(CreateSessionOverviewPdfPayload);

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
