const CreateFaceCaptureResourcePayload = require('../../../../../src/idv_service/session/create/face_capture/create.face.capture.resource.payload');

const REQUIREMENT_ID = 'x-abc-123';

describe('CreateFaceCaptureResourcePayload', () => {
  it('should throw an TypeError when the requirementId parameter is not defined', () => {
    expect(() => {
      // eslint-disable-next-line no-unused-vars
      const payload = new CreateFaceCaptureResourcePayload();
    }).toThrowError(TypeError);
  });

  it('should throw an TypeError when the requirementId parameter is not a string', () => {
    expect(() => {
      // eslint-disable-next-line no-unused-vars
      const payload = new CreateFaceCaptureResourcePayload(
        123
      );
    }).toThrowError(TypeError);
  });

  it('should serialize to JSON without optional parameters', () => {
    const payload = new CreateFaceCaptureResourcePayload(
      REQUIREMENT_ID
    );

    const expectedJson = JSON.stringify({
      requirement_id: REQUIREMENT_ID,
    });

    expect(JSON.stringify(payload)).toBe(expectedJson);
  });
});
