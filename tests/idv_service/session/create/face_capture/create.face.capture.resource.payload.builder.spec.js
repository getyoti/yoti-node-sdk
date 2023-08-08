const CreateFaceCaptureResourcePayloadBuilder = require('../../../../../src/idv_service/session/create/face_capture/create.face.capture.resource.payload.builder');

const REQUIREMENT_ID = 'x-abc-123';

describe('CreateFaceCaptureResourcePayload', () => {
  it('should throw an TypeError when the requirementId parameter is not set', () => {
    expect(() => {
      // eslint-disable-next-line no-unused-vars
      const payload = new CreateFaceCaptureResourcePayloadBuilder()
        .build();
    }).toThrowError(TypeError);
  });

  it('should throw an TypeError when the requirementId parameter is not a string', () => {
    expect(() => {
      // eslint-disable-next-line no-unused-vars
      const payload = new CreateFaceCaptureResourcePayloadBuilder()
        .withRequirementId(123)
        .build();
    }).toThrowError(TypeError);
  });

  it('should serialize to JSON without optional parameters', () => {
    const payload = new CreateFaceCaptureResourcePayloadBuilder()
      .withRequirementId(REQUIREMENT_ID)
      .build();

    const expectedJson = JSON.stringify({
      requirement_id: REQUIREMENT_ID,
    });

    expect(JSON.stringify(payload)).toBe(expectedJson);
  });
});
