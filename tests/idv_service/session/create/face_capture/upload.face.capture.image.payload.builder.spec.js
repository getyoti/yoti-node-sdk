const UploadFaceCaptureImagePayloadBuilder = require('../../../../../src/idv_service/session/create/face_capture/upload.face.capture.image.payload.builder');
const UploadFaceCaptureImagePayload = require('../../../../../src/idv_service/session/create/face_capture/upload.face.capture.image.payload');

const IMAGE_CONTENTS = Buffer.from('this would be an image', 'utf-8');

describe('CreateFaceCaptureResourcePayload', () => {
  it('should throw an TypeError when calling withImageContents with a parameter that is not a buffer', () => {
    expect(() => {
      // eslint-disable-next-line no-unused-vars
      const payload = new UploadFaceCaptureImagePayloadBuilder()
        .withImageContents([1, 2, 3])
        .forJpegImage()
        .build();
    }).toThrowError(TypeError);
  });

  it('should return the content type and content of the image', () => {
    const payload = new UploadFaceCaptureImagePayloadBuilder()
      .forPngImage()
      .withImageContents(IMAGE_CONTENTS)
      .build();

    expect(payload).toBeInstanceOf(UploadFaceCaptureImagePayload);
    expect(payload.getImageContentType()).toBe('image/png');
    expect(payload.getImageContents()).toBe(IMAGE_CONTENTS);
  });
});
