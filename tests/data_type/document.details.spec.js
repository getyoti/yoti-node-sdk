const expect = require('chai').expect;
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
    expect(err.message).to.equal(exceptionMessage);
  }
  expect(documentDetails).to.equal(null);
};

describe('documentDetails', () => {
  context('when value is empty', () => {
    it('it should throw an exception', () => {
      assertInvalidDocumentDetails('', 'Invalid value for DocumentDetails');
    });
  });
  context('when value is less than 3 words', () => {
    it('it should throw an exception', () => {
      assertInvalidDocumentDetails('PASS_CARD GBR', 'Invalid value for DocumentDetails');
    });
  });
  context('when value is four words', () => {
    it('it should parse one optional attribute', () => {
      const documentDetails = new DocumentDetails('PASSPORT GBR 01234567 2020-01-01');
      expect(documentDetails.type).to.equal('PASSPORT');
      expect(documentDetails.issuingCountry).to.equal('GBR');
      expect(documentDetails.documentNumber).to.equal('01234567');
      expect(documentDetails.expirationDate.toISOString().slice(0, 10)).to.equal('2020-01-01');
    });
  });
  context('when value is five words', () => {
    it('it should parse two optional attributes', () => {
      const documentDetails = new DocumentDetails('DRIVING_LICENCE GBR 1234abc 2016-05-01 DVLA');
      expect(documentDetails.type).to.equal('DRIVING_LICENCE');
      expect(documentDetails.issuingCountry).to.equal('GBR');
      expect(documentDetails.documentNumber).to.equal('1234abc');
      expect(documentDetails.expirationDate.toISOString().slice(0, 10)).to.equal('2016-05-01');
      expect(documentDetails.issuingAuthority).to.equal('DVLA');
    });
  });
  context('when value is more than five words', () => {
    it('it should parse only two optional attributes', () => {
      const documentDetails = new DocumentDetails('DRIVING_LICENCE GBR 1234abc 2016-05-01 DVLA someThirdAttribute');
      expect(documentDetails.type).to.equal('DRIVING_LICENCE');
      expect(documentDetails.issuingCountry).to.equal('GBR');
      expect(documentDetails.documentNumber).to.equal('1234abc');
      expect(documentDetails.expirationDate.toISOString().slice(0, 10)).to.equal('2016-05-01');
      expect(documentDetails.issuingAuthority).to.equal('DVLA');
    });
  });
  context('when value has invalid country 13', () => {
    it('it should throw an exception', () => {
      assertInvalidDocumentDetails('PASSPORT 13 1234abc 2016-05-01', 'Invalid value for DocumentDetails');
    });
  });
  context('when value has invalid document number', () => {
    it('it should throw an exception', () => {
      assertInvalidDocumentDetails('PASSPORT GBR $%^$%^£ 2016-05-01', 'Invalid value for DocumentDetails');
    });
  });
  context('when expiration Date is set to dash (-)', () => {
    it('it should return NULL for date value', () => {
      const documentDetails = new DocumentDetails('PASS_CARD GBR 22719564893 - CITIZENCARD');
      expect(documentDetails.type).to.equal('PASS_CARD');
      expect(documentDetails.issuingCountry).to.equal('GBR');
      expect(documentDetails.documentNumber).to.equal('22719564893');
      expect(documentDetails.expirationDate).to.equal(null);
      expect(documentDetails.issuingAuthority).to.equal('CITIZENCARD');
    });
  });
  context('when there is an invalid date', () => {
    it('it should throw an exception', () => {
      assertInvalidDocumentDetails('PASSPORT GBR 1234abc X016-05-01', 'Invalid Date');
    });
  });
});
