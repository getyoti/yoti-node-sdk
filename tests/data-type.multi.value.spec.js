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
  context('#getItems', () => {
    it('should return provided array of items', () => {
      const multiValue = new MultiValue(getTestValues());
      const thirdLevelMultiValue = multiValue.getItems()[5].getItems()[5];

      expect(thirdLevelMultiValue).to.be.instanceOf(MultiValue);
      expect(thirdLevelMultiValue.getItems().length).to.equal(5);
      expect(thirdLevelMultiValue.getItems()[0]).to.be.instanceOf(ImageJpeg);
      expect(thirdLevelMultiValue.getItems()[1]).to.be.instanceOf(ImagePng);
    });
  });
  context('#applyFilters', () => {
    it('should apply filters to all multi values', () => {
      const multiValue = new MultiValue(getTestValues());
      expect(multiValue.getItems().length).to.equal(6);

      // Apply filters.
      multiValue
        .filterInstance(ImageJpeg)
        .filterInstance(MultiValue);

      // First level.
      expect(multiValue.getItems().length).to.equal(2);

      // Second level.
      const secondLevelMultiValue = multiValue.getItems()[1];
      expect(secondLevelMultiValue.getItems().length).to.equal(2);

      // Third level.
      const thirdLevelMultiValue = secondLevelMultiValue.getItems()[1];
      expect(thirdLevelMultiValue.getItems().length).to.equal(1);
    });
    it('should allow combination of instance and type filters', () => {
      const multiValue = new MultiValue(getTestValues());
      expect(multiValue.getItems()).to.eql(getTestValues());

      // Allow ImageJpeg instances, Array and MultiValue.
      multiValue
        .filterInstance(ImageJpeg)
        .filterType('Array')
        .filterType('MultiValue');
      expect(multiValue.getItems().length).to.equal(3);
      expect(multiValue.getItems()[0]).to.be.instanceOf(ImageJpeg);
      expect(multiValue.getItems()[1]).to.eql(['test', 'array']);
      expect(multiValue.getItems()[2]).to.be.instanceOf(MultiValue);

      // Check filters applied to second level.
      const secondLevelMultiValue = multiValue.getItems()[2];
      expect(secondLevelMultiValue.getItems().length).to.equal(3);
      expect(secondLevelMultiValue.getItems()[0]).to.be.instanceOf(ImageJpeg);
      expect(secondLevelMultiValue.getItems()[1]).to.eql(['test', 'array 2']);
      expect(secondLevelMultiValue.getItems()[2]).to.be.instanceOf(MultiValue);
    });
  });
  context('#filterInstance()', () => {
    it('should filter values by instance', () => {
      const multiValue = new MultiValue(getTestValues());
      expect(multiValue.getItems()).to.eql(getTestValues());

      // Allow only ImageJpeg.
      multiValue.filterInstance(ImageJpeg);
      expect(multiValue.getItems().length).to.equal(1);
      expect(multiValue.getItems()[0]).to.be.instanceOf(ImageJpeg);

      // Also allow ImagePng.
      multiValue.filterInstance(ImagePng);
      expect(multiValue.getItems().length).to.equal(2);
      expect(multiValue.getItems()[0]).to.be.instanceOf(ImageJpeg);
      expect(multiValue.getItems()[1]).to.be.instanceOf(ImagePng);

      // Reset filters.
      multiValue.resetFilters();
      expect(multiValue.getItems()).to.eql(getTestValues());

      // Allow any Image.
      multiValue.filterInstance(Image);
      expect(multiValue.getItems().length).to.equal(2);
      expect(multiValue.getItems()[0]).to.be.instanceOf(ImageJpeg);
      expect(multiValue.getItems()[1]).to.be.instanceOf(ImagePng);
    });
  });
  context('#filterType()', () => {
    it('should filter values by type', () => {
      const multiValue = new MultiValue(getTestValues());
      expect(multiValue.getItems()).to.eql(getTestValues());

      // Allow String and Object.
      multiValue
        .filterType('String')
        .filterType('Object');
      expect(multiValue.getItems().length).to.equal(2);
      expect(multiValue.getItems()[0]).to.equal('test string');
      expect(multiValue.getItems()[1]).to.eql({ name: 'test object' });

      // Also allow Arrays.
      multiValue.filterType('Array');
      expect(multiValue.getItems().length).to.equal(3);

      // Reset filters.
      multiValue.resetFilters();
      expect(multiValue.getItems()).to.eql(getTestValues());

      // Allow only ImageJpeg.
      multiValue.filterType('ImageJpeg');
      expect(multiValue.getItems().length).to.equal(1);
      expect(multiValue.getItems()[0]).to.be.instanceOf(ImageJpeg);

      // Also allow Strings.
      multiValue.filterType('String');
      expect(multiValue.getItems().length).to.equal(2);
      expect(multiValue.getItems()[0]).to.be.instanceOf(ImageJpeg);
      expect(multiValue.getItems()[1]).to.equal('test string');
    });
  });
});
