const { AmlAddress, AmlProfile } = require('../..');

const SOME_COUNTRY_CODE = 'GBR';
const SOME_POSTCODE = 'BN2 1TW';
const SOME_AML_ADDRESS = new AmlAddress(SOME_COUNTRY_CODE, SOME_POSTCODE);
const SOME_GIVEN_NAMES = 'some given names';
const SOME_FAMILY_NAME = 'some family name';
const SOME_SSN = '1234';

const SOME_AML_PROFILE = new AmlProfile(
  SOME_GIVEN_NAMES,
  SOME_FAMILY_NAME,
  SOME_AML_ADDRESS,
  SOME_SSN
);

const SOME_DATA = {
  given_names: SOME_GIVEN_NAMES,
  family_name: SOME_FAMILY_NAME,
  ssn: SOME_SSN,
  address: SOME_AML_ADDRESS.getData(),
};

describe('AmlProfile', () => {
  describe('#getGivenNames()', () => {
    it('should return given names', () => {
      expect(SOME_AML_PROFILE.getGivenNames()).toBe(SOME_GIVEN_NAMES);
    });
  });
  describe('#getFamilyName()', () => {
    it('should return family name', () => {
      expect(SOME_AML_PROFILE.getFamilyName()).toBe(SOME_FAMILY_NAME);
    });
  });
  describe('#getSsn()', () => {
    it('should return SSN', () => {
      expect(SOME_AML_PROFILE.getSsn()).toBe(SOME_SSN);
    });
  });
  describe('#getAmlAddress()', () => {
    it('should return address', () => {
      expect(SOME_AML_PROFILE.getAmlAddress()).toStrictEqual(SOME_AML_ADDRESS);
    });
  });
  describe('#validateAmlAddress()', () => {
    it('should throw error for empty address', () => {
      expect(() => SOME_AML_PROFILE.setAmlAddress(''))
        .toThrow(new Error('AmlAddress should be an object of Type/AmlAddress'));
    });
  });
  describe('#toString()', () => {
    it('should return AML profile data as JSON string', () => {
      expect(SOME_AML_PROFILE.toString()).toBe(JSON.stringify(SOME_DATA));
    });
  });
});
