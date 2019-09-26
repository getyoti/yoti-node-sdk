const { AgeVerification } = require('../../src/data_type/age.verification');
const { Attribute } = require('../../src/data_type/attribute');

const EXPECTED_PATTERN = /^[^:]+:(?!.*:)[0-9]+$/;

describe('AgeVerification', () => {
  describe('when malformed age derivation is provided', () => {
    it('should throw exception', () => {
      [
        '',
        ':',
        '18',
        'age_over:',
        'age_over:not_int',
        ':age_over:18',
        'age_over::18',
        'age_over:18:',
        'age_over:18:21',
      ].forEach((name) => {
        const attribute = new Attribute({
          name,
          value: 'true',
        });
        expect(() => new AgeVerification(attribute))
          .toThrow(new TypeError(`'attribute.name' value '${name}' does not match format '${EXPECTED_PATTERN}'`));
      });
    });
  });

  describe('when well formed age derivation is provided', () => {
    const attribute = new Attribute({
      name: 'any_string_here:21',
      value: 'true',
    });
    const ageVerification = new AgeVerification(attribute);
    it('should parse check type', () => {
      expect(ageVerification.getCheckType()).toBe('any_string_here');
    });
    it('should parse age', () => {
      expect(ageVerification.getAge()).toBe(21);
    });
    it('should parse result', () => {
      expect(ageVerification.getResult()).toBe(true);
    });
    it('should return provided attribute', () => {
      expect(ageVerification.getAttribute()).toBe(attribute);
    });
  });
});
