const { AgeVerification } = require('../../src/data_type/age.verification');
const { ATTR_AGE_OVER, ATTR_AGE_UNDER } = require('../../src/yoti_common/constants');

const EXPECTED_PATTERN = /^[^:]+:[0-9]+(?::[0-9]+)?$/;

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
        'age_over:18:21:',
      ].forEach((name) => {
        expect(() => new AgeVerification(name, 'true'))
          .toThrow(new TypeError(`'attribute.name' value '${name}' does not match format '${EXPECTED_PATTERN}'`));
      });
    });
  });

  describe(`when well formed age derivation is provided: ${ATTR_AGE_UNDER}21`, () => {
    const ageVerification = new AgeVerification(`${ATTR_AGE_UNDER}21`, 'true');

    it('should parse check type', () => {
      expect(ageVerification.getCheckType()).toBe('age_under');
    });
    it('should parse age', () => {
      expect(ageVerification.getAge()).toBe(21);
    });
    it('should parse result', () => {
      expect(ageVerification.getResult()).toBe(true);
    });
  });

  describe(`when well formed age derivation is provided: ${ATTR_AGE_OVER}21`, () => {
    const ageVerification = new AgeVerification(`${ATTR_AGE_OVER}21`, 'true');

    it('should parse check type', () => {
      expect(ageVerification.getCheckType()).toBe('age_over');
    });
    it('should parse age', () => {
      expect(ageVerification.getAge()).toBe(21);
    });
    it('should parse result', () => {
      expect(ageVerification.getResult()).toBe(true);
    });
  });

  describe(`when well formed age derivation is provided (with age buffer): ${ATTR_AGE_OVER}21:5`, () => {
    const ageVerification = new AgeVerification(`${ATTR_AGE_OVER}21:5`, 'true');

    it('should parse check type', () => {
      expect(ageVerification.getCheckType()).toBe('age_over');
    });
    it('should parse age', () => {
      expect(ageVerification.getAge()).toBe(21);
    });
    it('should parse age buffer', () => {
      expect(ageVerification.getAgeBuffer()).toBe(5);
    });
    it('should parse result', () => {
      expect(ageVerification.getResult()).toBe(true);
    });
  });
});
