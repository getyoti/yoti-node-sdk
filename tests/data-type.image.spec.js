const expect = require('chai').expect;
const Image = require('../src/data_type/image');
const ImageJpeg = require('../src/data_type/image.jpeg');
const ImagePng = require('../src/data_type/image.png');

const imageContent = {
  toBase64() {
    return 'test_image_data';
  },
};

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
    context('#getContent()', () => {
      it('it should return original image content', () => {
        expect(type.imageObj.getContent()).to.equal(imageContent);
      });
    });
    context('#getBase64Content()', () => {
      it('it should return base64 image content', () => {
        const base64String = `data:${type.mimeType};base64,${imageContent.toBase64()}`;
        expect(type.imageObj.getBase64Content()).to.equal(base64String);
      });
    });
    context('#getMimeType()', () => {
      it(`it should return ${type.mimeType}`, () => {
        expect(type.imageObj.getMimeType()).to.equal(type.mimeType);
      });
    });
    context('when instatiated', () => {
      it('it should be an instance of Image', () => {
        expect(type.imageObj).to.be.an.instanceof(Image);
      });
    });
  });
});
