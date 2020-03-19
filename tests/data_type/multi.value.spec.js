const MultiValue = require('../../src/data_type/multi.value');
const ImageJpeg = require('../../src/data_type/image.jpeg');
const ImagePng = require('../../src/data_type/image.png');

const getTestValues = () => [
  new ImageJpeg(Buffer.from('image_1')),
  new ImagePng(Buffer.from('image_2')),
  'test string',
  { name: 'test object' },
  ['test', 'array'],
  new MultiValue([
    new ImageJpeg(Buffer.from('image_3')),
    new ImagePng(Buffer.from('image_4')),
    'test string 2',
    { name: 'test object 2' },
    ['test', 'array 2'],
    new MultiValue([
      new ImageJpeg(Buffer.from('image_5')),
      new ImagePng(Buffer.from('image_6')),
      'test string 3',
      { name: 'test object 3' },
      ['test', 'array 3'],
    ]),
  ]),
];

describe('MultiValue', () => {
  describe('#getItems', () => {
    it('should return provided array of items', () => {
      const multiValue = new MultiValue(getTestValues());
      expect(multiValue.getItems()).toEqual(getTestValues());
    });
  });
  describe('#applyFilters', () => {
    it('should apply filters to all multi values', () => {
      const multiValue = new MultiValue(getTestValues());
      expect(multiValue.getItems().length).toBe(6);

      // Apply filters.
      multiValue
        .allowInstance(ImageJpeg)
        .allowInstance(MultiValue);

      // First level.
      expect(multiValue.getItems().length).toBe(2);

      // Second level.
      const secondLevelMultiValue = multiValue.getItems()[1];
      expect(secondLevelMultiValue.getItems().length).toBe(2);
      expect(secondLevelMultiValue.getItems()[0]).toBeInstanceOf(ImageJpeg);
      expect(secondLevelMultiValue.getItems()[1]).toBeInstanceOf(MultiValue);

      // Third level.
      const thirdLevelMultiValue = secondLevelMultiValue.getItems()[1];
      expect(thirdLevelMultiValue.getItems().length).toBe(1);
      expect(thirdLevelMultiValue.getItems()[0]).toBeInstanceOf(ImageJpeg);
    });
    it('should allow combination of instance and type filters', () => {
      const multiValue = new MultiValue(getTestValues());
      expect(multiValue.getItems()).toEqual(getTestValues());

      multiValue
        .allowInstance(ImageJpeg)
        .allowType('Array')
        .allowType('MultiValue');
      expect(multiValue.getItems().length).toBe(3);
      expect(multiValue.getItems()[0]).toBeInstanceOf(ImageJpeg);
      expect(multiValue.getItems()[1]).toEqual(['test', 'array']);
      expect(multiValue.getItems()[2]).toBeInstanceOf(MultiValue);

      // Check filters applied to second level.
      const secondLevelMultiValue = multiValue.getItems()[2];
      expect(secondLevelMultiValue.getItems().length).toBe(3);
      expect(secondLevelMultiValue.getItems()[0]).toBeInstanceOf(ImageJpeg);
      expect(secondLevelMultiValue.getItems()[1]).toEqual(['test', 'array 2']);
      expect(secondLevelMultiValue.getItems()[2]).toBeInstanceOf(MultiValue);
    });
  });
  describe('#allowInstance()', () => {
    it('should filter values by instance', () => {
      const multiValue = new MultiValue(getTestValues());
      expect(multiValue.getItems()).toEqual(getTestValues());

      multiValue.allowInstance(ImageJpeg);
      expect(multiValue.getItems().length).toBe(1);
      expect(multiValue.getItems()[0]).toBeInstanceOf(ImageJpeg);

      multiValue.allowInstance(ImagePng);
      expect(multiValue.getItems().length).toBe(2);
      expect(multiValue.getItems()[0]).toBeInstanceOf(ImageJpeg);
      expect(multiValue.getItems()[1]).toBeInstanceOf(ImagePng);
    });
  });
  describe('#allowType()', () => {
    it('should filter values by type', () => {
      const multiValue = new MultiValue(getTestValues());
      expect(multiValue.getItems()).toEqual(getTestValues());

      multiValue
        .allowType('String')
        .allowType('Object');
      expect(multiValue.getItems().length).toBe(2);
      expect(multiValue.getItems()[0]).toBe('test string');
      expect(multiValue.getItems()[1]).toEqual({ name: 'test object' });

      multiValue.allowType('Array');
      expect(multiValue.getItems().length).toBe(3);
    });
  });
});
