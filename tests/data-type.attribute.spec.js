const fs = require('fs');
const expect = require('chai').expect;
const protoRoot = require('../src/proto-root').initializeProtoBufObjects();

const { Attribute } = require('../src/data_type/attribute');
const { DocumentDetails } = require('../src/data_type/document.details');

function parseAnchorData(anchorString) {
  return protoRoot.builder.attrpubapi_v1.Anchor.decode(anchorString);
}

describe('Attribute', () => {
  const documentDetails = new DocumentDetails('PASSPORT GBR 01234567 2020-01-01');
  const dlSourceAnchor = fs.readFileSync('./tests/sample-data/yoti-common/dl-source-anchor.txt', 'utf8');
  const verifierAnchor = fs.readFileSync('./tests/sample-data/yoti-common/verifier-anchor.txt', 'utf8');
  const attributeObj = new Attribute({
    value: documentDetails,
    name: 'document_details',
    sources: [parseAnchorData(dlSourceAnchor)],
    verifiers: [parseAnchorData(verifierAnchor)],
  });

  context('Attribute.getValue()', () => {
    it('it should return DocumentDetails instance', () => {
      expect(attributeObj.getValue()).to.be.an.instanceof(DocumentDetails);
    });
  });
  context('Attribute.getName()', () => {
    it('it should return document_details', () => {
      expect(attributeObj.getName()).to.equal('document_details');
    });
  });
  context('Attribute.getSources()[0]', () => {
    it('it should return an Anchor object', () => {
      expect(attributeObj.getSources()[0]).to.be.an('object');
    });
  });
  context('Attribute.getVerifiers()[0]', () => {
    it('it should return an Anchor object', () => {
      expect(attributeObj.getVerifiers()[0]).to.be.an('object');
    });
  });
  context('When Attribute value is a DocumentDetails', () => {
    it('it should return PASSPORT as type', () => {
      expect(attributeObj.getValue().getType()).to.equal('PASSPORT');
    });
    it('it should return GBR as Issuing country', () => {
      expect(attributeObj.getValue().getIssuingCountry()).to.equal('GBR');
    });
    it('it should return 01234567 as documentNumber', () => {
      expect(attributeObj.getValue().getDocumentNumber()).to.equal('01234567');
    });
    it('it should return 2020-01-01 as expiration Date', () => {
      expect(attributeObj.getValue().getExpirationDate().toISOString().slice(0, 10)).to.equal('2020-01-01');
    });
  });
});
