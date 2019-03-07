const expect = require('chai').expect;
const MultiValue = require('../src/data_type/multi.value');
const Image = require('../src/data_type/image');
const ImageJpeg = require('../src/data_type/image.jpeg');
const ImagePng = require('../src/data_type/image.png');

const getTestValues = () => [
  new ImageJpeg('image_1'),
  new ImagePng('image_2'),
  'test string',
  { name: 'test object' },
  ['test', 'array'],
  new MultiValue([
    new ImageJpeg('image_3'),
    new ImagePng('image_4'),
    'test string 2',
    { name: 'test object 2' },
    ['test', 'array 2'],
    new MultiValue([
      new ImageJpeg('image_5'),
      new ImagePng('image_6'),
      'test string 3',
      { name: 'test object 3' },
      ['test', 'array 3'],
    ]),
  ]),
];

describe('MultiValue', () => {
  context('Should allow nesting', () => {
    const multiValue = new MultiValue(getTestValues());
    const thirdLevelMultiValue = multiValue.getValues()[5].getValues()[5];

    expect(thirdLevelMultiValue).to.be.instanceOf(MultiValue);
    expect(thirdLevelMultiValue.getValues().length).to.equal(5);
    expect(thirdLevelMultiValue.getValues()[0]).to.be.instanceOf(ImageJpeg);
    expect(thirdLevelMultiValue.getValues()[1]).to.be.instanceOf(ImagePng);
  });
  context('#applyFilters', () => {
    it('should apply filters to all multi values', () => {
      const multiValue = new MultiValue(getTestValues());
      expect(multiValue.getValues().length).to.equal(6);

      // Apply filters.
      multiValue
        .filterInstance(ImageJpeg)
        .filterInstance(MultiValue);

      // First level.
      expect(multiValue.getValues().length).to.equal(2);

      // Second level.
      const secondLevelMultiValue = multiValue.getValues()[1];
      expect(secondLevelMultiValue.getValues().length).to.equal(2);

      // Third level.
      const thirdLevelMultiValue = secondLevelMultiValue.getValues()[1];
      expect(thirdLevelMultiValue.getValues().length).to.equal(1);
    });
    it('should allow combination of instance and type filters', () => {
      const multiValue = new MultiValue(getTestValues());
      expect(multiValue.getValues()).to.eql(getTestValues());

      // Allow ImageJpeg instances, Array and MultiValue.
      multiValue
        .filterInstance(ImageJpeg)
        .filterType('Array')
        .filterType('MultiValue');
      expect(multiValue.getValues().length).to.equal(3);
      expect(multiValue.getValues()[0]).to.be.instanceOf(ImageJpeg);
      expect(multiValue.getValues()[1]).to.eql(['test', 'array']);
      expect(multiValue.getValues()[2]).to.be.instanceOf(MultiValue);

      // Check filters applied to second level.
      const secondLevelMultiValue = multiValue.getValues()[2];
      expect(secondLevelMultiValue.getValues().length).to.equal(3);
      expect(secondLevelMultiValue.getValues()[0]).to.be.instanceOf(ImageJpeg);
      expect(secondLevelMultiValue.getValues()[1]).to.eql(['test', 'array 2']);
      expect(secondLevelMultiValue.getValues()[2]).to.be.instanceOf(MultiValue);
    });
  });
  context('#filterInstance()', () => {
    it('should filter values by instance', () => {
      const multiValue = new MultiValue(getTestValues());
      expect(multiValue.getValues()).to.eql(getTestValues());

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
      expect(multiValue.getValues()).to.eql(getTestValues());

      // Allow any Image.
      multiValue.filterInstance(Image);
      expect(multiValue.getValues().length).to.equal(2);
      expect(multiValue.getValues()[0]).to.be.instanceOf(ImageJpeg);
      expect(multiValue.getValues()[1]).to.be.instanceOf(ImagePng);
    });
  });
  context('#filterType()', () => {
    it('should filter values by type', () => {
      const multiValue = new MultiValue(getTestValues());
      expect(multiValue.getValues()).to.eql(getTestValues());

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
      expect(multiValue.getValues()).to.eql(getTestValues());

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
