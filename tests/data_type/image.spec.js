const Image = require('../../src/data_type/image');
const ImageJpeg = require('../../src/data_type/image.jpeg');
const ImagePng = require('../../src/data_type/image.png');

const imageContent = Buffer.from('test_image_data');

const imageTypes = [
  {
    imageObj: new ImageJpeg(imageContent),
    mimeType: 'image/jpeg',
  },
  {
    imageObj: new ImagePng(imageContent),
    mimeType: 'image/png',
  },
];

imageTypes.forEach((type) => {
  describe(`${type.imageObj.constructor.name}`, () => {
    describe('#getContent()', () => {
      it('should return original image content', () => {
        expect(type.imageObj.getContent().buffer).toStrictEqual(imageContent);
      });
    });
    describe('#getBase64Content()', () => {
      it('should return base64 image content', () => {
        const base64String = `data:${type.mimeType};base64,${imageContent.toString('base64')}`;
        expect(type.imageObj.getBase64Content()).toBe(base64String);
      });
    });
    describe('#getMimeType()', () => {
      it(`should return ${type.mimeType}`, () => {
        expect(type.imageObj.getMimeType()).toBe(type.mimeType);
      });
    });
    describe('when instantiated', () => {
      it('should be an instance of Image', () => {
        expect(type.imageObj).toBeInstanceOf(Image);
      });
    });
  });
});
