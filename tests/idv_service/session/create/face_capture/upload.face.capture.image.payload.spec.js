const UploadFaceCaptureImagePayload = require('../../../../../src/idv_service/session/create/face_capture/upload.face.capture.image.payload');

const IMAGE_CONTENTS = Buffer.from('this would be an image', 'utf-8');

describe('CreateFaceCaptureResourcePayload', () => {
  it('should throw an TypeError when the imageContentType parameter is not defined', () => {
    expect(() => {
      // eslint-disable-next-line no-unused-vars
      const payload = new UploadFaceCaptureImagePayload(undefined, IMAGE_CONTENTS);
    }).toThrowError(TypeError);
  });

  it('should throw an TypeError when the imageContentType parameter is a string', () => {
    expect(() => {
      // eslint-disable-next-line no-unused-vars
      const payload = new UploadFaceCaptureImagePayload(123, IMAGE_CONTENTS);
    }).toThrowError(TypeError);
  });

  it('should throw an TypeError when the imageContents parameter is not defined', () => {
    expect(() => {
      // eslint-disable-next-line no-unused-vars
      const payload = new UploadFaceCaptureImagePayload('image/png', undefined);
    }).toThrowError(TypeError);
  });

  it('should throw an TypeError when the imageContents parameter is not a Buffer', () => {
    expect(() => {
      // eslint-disable-next-line no-unused-vars
      const payload = new UploadFaceCaptureImagePayload('image/png', [1, 2, 3]);
    }).toThrowError(TypeError);
  });

  it('should return the content type and content of the image', () => {
    const payload = new UploadFaceCaptureImagePayload('image/png', IMAGE_CONTENTS);

    expect(payload.getImageContentType()).toBe('image/png');
    expect(payload.getImageContents()).toBe(IMAGE_CONTENTS);
  });
});
