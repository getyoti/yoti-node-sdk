const { AmlAddress } = require('../..');

const SOME_COUNTRY_CODE = 'GBR';
const SOME_POSTCODE = 'BN2 1TW';
const SOME_AML_ADDRESS = new AmlAddress(SOME_COUNTRY_CODE, SOME_POSTCODE);
const SOME_DATA = {
  post_code: SOME_POSTCODE,
  country: SOME_COUNTRY_CODE,
};

describe('AmlAddress', () => {
  describe('#getCountryCode()', () => {
    it(`should return ${SOME_COUNTRY_CODE}`, () => {
      expect(SOME_AML_ADDRESS.getCountryCode()).toBe(SOME_COUNTRY_CODE);
    });
  });

  describe('#getPostcode()', () => {
    it(`should return ${SOME_POSTCODE}`, () => {
      expect(SOME_AML_ADDRESS.getPostcode()).toBe(SOME_POSTCODE);
    });
  });

  describe('#getData()', () => {
    it('should return object', () => {
      expect(SOME_AML_ADDRESS.getData()).toStrictEqual(SOME_DATA);
    });
  });

  describe('#toString()', () => {
    it('should return JSON string', () => {
      expect(SOME_AML_ADDRESS.toString()).toStrictEqual(JSON.stringify(SOME_DATA));
    });
  });

  describe('#setCountryCode()', () => {
    it('should throw error when empty country code is provided', () => {
      [null, '', undefined].forEach((emptyCountryCode) => {
        expect(() => SOME_AML_ADDRESS.setCountryCode(emptyCountryCode))
          .toThrow(new Error('countryCode cannot be null or empty'));
      });
    });
  });

  describe('#validateCountryCode()', () => {
    it('should throw error when empty country code is provided', () => {
      [null, '', undefined].forEach((emptyCountryCode) => {
        SOME_AML_ADDRESS.countryCode = emptyCountryCode;
        expect(() => SOME_AML_ADDRESS.validateCountryCode())
          .toThrow(new Error('countryCode cannot be null or empty'));
      });
    });
  });
});
