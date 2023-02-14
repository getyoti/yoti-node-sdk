const Validation = require('../../src/yoti_common/validation');

describe('Validation', () => {
  describe('#instanceOf', () => {
    it('should throw type error when incorrect instance is provided', () => {
      expect(() => Validation.instanceOf('some-string', Array, 'name'))
        .toThrow(new TypeError('name must be instance of Array'));
    });
  });

  describe('#isString', () => {
    it('should throw type error when string is not provided', () => {
      expect(() => Validation.isString([], 'name'))
        .toThrow(new TypeError('name must be a string'));
    });
  });

  describe('#isStringDate', () => {
    it('should throw type error when string date is not provided', () => {
      expect(() => Validation.isStringDate([], 'name'))
        .toThrow(new TypeError('name must be a date like string'));
    });
  });

  describe('#isBoolean', () => {
    it('should throw type error when boolean is not provided', () => {
      expect(() => Validation.isBoolean('some-string', 'name'))
        .toThrow(new TypeError('name must be a boolean'));
    });
  });

  describe('#hasOnlyStringValues', () => {
    it('should throw type error when array contains non-string values', () => {
      expect(() => Validation.hasOnlyStringValues([[]], 'name'))
        .toThrow(new TypeError('all values in name must be a string'));
    });
  });

  describe('#isArray', () => {
    it('should throw type error when array is not provided', () => {
      expect(() => Validation.isArray('', 'name'))
        .toThrow(new TypeError('name must be an array'));
    });
  });

  describe('#isInteger', () => {
    it('should throw type error when integer is not provided', () => {
      expect(() => Validation.isInteger('some-string', 'name'))
        .toThrow(new TypeError('name must be an integer'));
    });
  });

  describe('#isNumber', () => {
    it('should throw type error when number is not provided', () => {
      expect(() => Validation.isNumber('some-string', 'name'))
        .toThrow(new TypeError('name must be a number'));
    });
  });

  describe('#isPlainObject', () => {
    it('should accepts a plain object', () => {
      expect(() => Validation.isPlainObject({ some: 'thing' }, 'name'))
        .not.toThrow();
    });
    it('should throw type error when plain object is not provided (string)', () => {
      expect(() => Validation.isPlainObject('a fake plain object', 'name'))
        .toThrow(new TypeError('name must be a plain object'));
    });
    it('should throw type error when plain object is not provided (array)', () => {
      expect(() => Validation.isPlainObject([123, 456], 'name'))
        .toThrow(new TypeError('name must be a plain object'));
    });
    it('should throw type error when plain object is not provided (date)', () => {
      expect(() => Validation.isPlainObject(new Date(), 'name'))
        .toThrow(new TypeError('name must be a plain object'));
    });
    it('should throw type error when plain object is not provided (null)', () => {
      expect(() => Validation.isPlainObject(null, 'name'))
        .toThrow(new TypeError('name must be a plain object'));
    });
  });

  describe('#notNull', () => {
    it('should throw type error when value is null', () => {
      expect(() => Validation.notNull(null, 'name'))
        .toThrow(new TypeError('name cannot be null'));
    });
  });

  describe('#isArrayOfType', () => {
    it('should throw type error when array does not contain correct type', () => {
      expect(() => Validation.isArrayOfType([{}], Array, 'values'))
        .toThrow(new TypeError('values must be instance of Array'));
    });
  });

  describe('#isArrayOfTypes', () => {
    it('should throw type error when array does not contain correct types', () => {
      expect(() => Validation.isArrayOfTypes([{}], [Array, Date], 'name'))
        .toThrow(new TypeError('name must be an array containing any of the following types: Array, Date'));
    });
  });

  describe('#isArrayOfStrings', () => {
    it('should throw type error when array does not contain strings', () => {
      expect(() => Validation.isArrayOfStrings([{}], 'value'))
        .toThrow(new TypeError('value items must be a string'));
    });
  });

  describe('#isArrayOfIntegers', () => {
    it('should throw type error when array does not contain integers', () => {
      expect(() => Validation.isArrayOfIntegers([{}], 'value'))
        .toThrow(new TypeError('value items must be an integer'));
    });
  });

  describe('#notGreaterThan', () => {
    it('should throw range error when value is not in range', () => {
      expect(() => Validation.notGreaterThan(10, 1, 'name'))
        .toThrow(new RangeError("'name' value '10' is greater than '1'"));
    });
  });

  describe('#notLessThan', () => {
    it('should throw range error when value is not in range', () => {
      expect(() => Validation.notLessThan(1, 10, 'name'))
        .toThrow(new RangeError("'name' value '1' is less than '10'"));
    });
  });

  describe('#matchesPattern', () => {
    it('should throw type error when value does not match pattern', () => {
      expect(() => Validation.matchesPattern('some-string', /\d+/, 'name'))
        .toThrow(new TypeError("'name' value 'some-string' does not match format '/\\d+/'"));
    });
  });

  describe('#withinRange', () => {
    it('should throw range error when value is less than min limit', () => {
      expect(() => Validation.withinRange(1, 10, 20, 'name'))
        .toThrow(new RangeError("'name' value '1' is less than '10'"));
    });
    it('should throw range error when value is greater than max limit', () => {
      expect(() => Validation.withinRange(30, 10, 20, 'name'))
        .toThrow(new RangeError("'name' value '30' is greater than '20'"));
    });
  });

  describe('#notNullOrEmpty', () => {
    test.each([
      [''],
      [null],
    ])('should throw type error value is null or empty', (value) => {
      expect(() => Validation.notNullOrEmpty(value, 'name'))
        .toThrow(new TypeError('name cannot be null or empty'));
    });
  });

  describe('#oneOf', () => {
    const acceptedValues = ['abc', 'def', 123];
    describe('valid cases', () => {
      test.each([
        ['abc'],
        ['def'],
        [123],
      ])('should not throw error as value is an accepted one', (value) => {
        expect(() => Validation.oneOf(value, acceptedValues, 'name'))
          .not.toThrow();
      });
    });
    describe('invalid cases', () => {
      test.each([
        [''],
        [null],
        ['ab'],
        [12],
        ['123'],
      ])('should throw error as value is not an accepted one', (value) => {
        expect(() => Validation.oneOf(value, acceptedValues, 'name'))
          .toThrow(new Error('name is not an accepted value'));
      });
    });
  });
});
