const expect = require('chai').expect;
const MultiValue = require('../src/data_type/multi.value');
const Image = require('../src/data_type/image');
const ImageJpeg = require('../src/data_type/image.jpeg');
const ImagePng = require('../src/data_type/image.png');

const testValues = [
  new ImageJpeg('image_1'),
  new ImagePng('image_2'),
  'test string',
  {
    name: 'test object',
  },
  [
    'test',
    'array',
  ],
];

describe('MultiValue', () => {
  context('#filterInstance()', () => {
    it('should filter values by instance', () => {
      const multiValue = new MultiValue(testValues);
      expect(multiValue.getValues()).to.eql(testValues);

      // Allow only ImageJpeg.
      multiValue.filterInstance(ImageJpeg);
      expect(multiValue.getValues().length).to.equal(1);
      expect(multiValue.getValues()[0]).to.be.instanceOf(ImageJpeg);

      // Also allow ImagePng.
      multiValue.filterInstance(ImagePng);
      expect(multiValue.getValues().length).to.equal(2);
      expect(multiValue.getValues()[0]).to.be.instanceOf(ImageJpeg);
      expect(multiValue.getValues()[1]).to.be.instanceOf(ImagePng);

      // Reset filters.
      multiValue.resetFilters();
      expect(multiValue.getValues()).to.eql(testValues);

      // Allow any Image.
      multiValue.filterInstance(Image);
      expect(multiValue.getValues().length).to.equal(2);
      expect(multiValue.getValues()[0]).to.be.instanceOf(ImageJpeg);
      expect(multiValue.getValues()[1]).to.be.instanceOf(ImagePng);
    });
  });
  context('#filterType()', () => {
    it('should filter values by type', () => {
      const multiValue = new MultiValue(testValues);
      expect(multiValue.getValues()).to.eql(testValues);

      // Allow String and Object.
      multiValue
        .filterType('String')
        .filterType('Object');
      expect(multiValue.getValues().length).to.equal(2);
      expect(multiValue.getValues()[0]).to.equal('test string');
      expect(multiValue.getValues()[1]).to.eql({ name: 'test object' });

      // Also allow Arrays.
      multiValue.filterType('Array');
      expect(multiValue.getValues().length).to.equal(3);

      // Reset filters.
      multiValue.resetFilters();
      expect(multiValue.getValues()).to.eql(testValues);

      // Allow only ImageJpeg.
      multiValue.filterType('ImageJpeg');
      expect(multiValue.getValues().length).to.equal(1);
      expect(multiValue.getValues()[0]).to.be.instanceOf(ImageJpeg);

      // Also allow Strings.
      multiValue.filterType('String');
      expect(multiValue.getValues().length).to.equal(2);
      expect(multiValue.getValues()[0]).to.be.instanceOf(ImageJpeg);
      expect(multiValue.getValues()[1]).to.equal('test string');
    });
  });
});
