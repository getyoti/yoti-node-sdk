const { DocumentDetails } = require('../../src/data_type/document.details');

/**
 * Check that provided value is invalid.
 *
 * @param {string} value
 * @param {string} exceptionMessage
 */
const assertInvalidDocumentDetails = (value, exceptionMessage) => {
  expect(() => new DocumentDetails(value)).toThrow(new Error(exceptionMessage));
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
  test.each([
    ['****'],
    ['~!@#$%^&*()-_=+[]{}|;\':,./<>?'],
    ['""'],
    ['\\'],
    ['"'],
    ['\'\''],
    ['\''],
  ])('%s should be allowed as document number', (validDocumentNumber) => {
    const documentDetails = new DocumentDetails(`some-type some-country ${validDocumentNumber} - some-authority`);
    expect(documentDetails.getDocumentNumber()).toBe(validDocumentNumber);
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
  describe('when there are extra spaces', () => {
    test.each([
      ['some-type   some-country some-doc-number - some-authority'],
      ['some-type some-country  some-doc-number - some-authority'],
      ['some-type some-country some-doc-number  - some-authority'],
      ['some-type some-country some-doc-number -  some-authority'],
    ])('%s should be allowed as document number', (value) => {
      assertInvalidDocumentDetails(
        value,
        'Invalid value for DocumentDetails'
      );
    });
  });
  /**
   * @deprecated 4.0.0
   */
  describe('#validateData', () => {
    test.each([
      ['PASSPORT 13 1234abc 2016-05-01'],
      ['PASSPORT GBR $%^$%^£ 2016-05-01'],
    ])('should throw an exception for %s', (value) => {
      const documentDetails = new DocumentDetails('some-type some-country some-doc-number');
      expect(() => documentDetails.validateData(value)).toThrow(new Error('Invalid value for DocumentDetails'));
    });
  });
});
