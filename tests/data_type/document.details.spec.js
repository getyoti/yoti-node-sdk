const { DocumentDetails } = require('../../src/data_type/document.details');

/**
 * Check that provided value is invalid.
 *
 * @param {string} value
 * @param {string} exceptionMessage
 */
const assertInvalidDocumentDetails = (value, exceptionMessage) => {
  let documentDetails = null;
  try {
    documentDetails = new DocumentDetails(value);
  } catch (err) {
    expect(err.message).toBe(exceptionMessage);
  }
  expect(documentDetails).toBe(null);
};

describe('documentDetails', () => {
  describe('when value is empty', () => {
    it('should throw an exception', () => {
      assertInvalidDocumentDetails('', 'Invalid value for DocumentDetails');
    });
  });
  describe('when value is less than 3 words', () => {
    it('should throw an exception', () => {
      assertInvalidDocumentDetails('PASS_CARD GBR', 'Invalid value for DocumentDetails');
    });
  });
  describe('when value is three words', () => {
    it('should return undefined for optional attributes', () => {
      const documentDetails = new DocumentDetails('PASSPORT GBR 01234567');
      expect(documentDetails.getExpirationDate()).toBeUndefined();
      expect(documentDetails.getIssuingAuthority()).toBeUndefined();
    });
  });
  describe('when value is four words', () => {
    it('should parse one optional attribute', () => {
      const documentDetails = new DocumentDetails('PASSPORT GBR 01234567 2020-01-01');
      expect(documentDetails.getType()).toBe('PASSPORT');
      expect(documentDetails.getIssuingCountry()).toBe('GBR');
      expect(documentDetails.getDocumentNumber()).toBe('01234567');
      expect(documentDetails.getExpirationDate().toISOString().slice(0, 10)).toBe('2020-01-01');
    });
  });
  describe('when value is five words', () => {
    it('should parse two optional attributes', () => {
      const documentDetails = new DocumentDetails('DRIVING_LICENCE GBR 1234abc 2016-05-01 DVLA');
      expect(documentDetails.getType()).toBe('DRIVING_LICENCE');
      expect(documentDetails.getIssuingCountry()).toBe('GBR');
      expect(documentDetails.getDocumentNumber()).toBe('1234abc');
      expect(documentDetails.getExpirationDate().toISOString().slice(0, 10)).toBe('2016-05-01');
      expect(documentDetails.getIssuingAuthority()).toBe('DVLA');
    });
  });
  describe('when value is more than five words', () => {
    it('should parse only two optional attributes', () => {
      const documentDetails = new DocumentDetails('DRIVING_LICENCE GBR 1234abc 2016-05-01 DVLA someThirdAttribute');
      expect(documentDetails.getType()).toBe('DRIVING_LICENCE');
      expect(documentDetails.getIssuingCountry()).toBe('GBR');
      expect(documentDetails.getDocumentNumber()).toBe('1234abc');
      expect(documentDetails.getExpirationDate().toISOString().slice(0, 10)).toBe('2016-05-01');
      expect(documentDetails.getIssuingAuthority()).toBe('DVLA');
    });
  });
  describe('when value has invalid country 13', () => {
    it('should throw an exception', () => {
      assertInvalidDocumentDetails('PASSPORT 13 1234abc 2016-05-01', 'Invalid value for DocumentDetails');
    });
  });
  describe('when value has invalid document number', () => {
    it('should throw an exception', () => {
      assertInvalidDocumentDetails('PASSPORT GBR $%^$%^£ 2016-05-01', 'Invalid value for DocumentDetails');
    });
  });
  describe('when expiration Date is set to dash (-)', () => {
    it('should return NULL for date value', () => {
      const documentDetails = new DocumentDetails('PASS_CARD GBR 22719564893 - CITIZENCARD');
      expect(documentDetails.getType()).toBe('PASS_CARD');
      expect(documentDetails.getIssuingCountry()).toBe('GBR');
      expect(documentDetails.getDocumentNumber()).toBe('22719564893');
      expect(documentDetails.getExpirationDate()).toBe(null);
      expect(documentDetails.getIssuingAuthority()).toBe('CITIZENCARD');
    });
  });
  describe('when there is an invalid date', () => {
    it('should throw an exception', () => {
      assertInvalidDocumentDetails('PASSPORT GBR 1234abc X016-05-01', 'Invalid Date');
    });
  });
});
