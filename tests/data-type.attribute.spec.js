const fs = require('fs');
const expect = require('chai').expect;
const protoRoot = require('../src/proto-root').initializeProtoBufObjects();
const AnchorProcessor = require('../src/yoti_common/anchor.processor').AnchorProcessor;

const { Attribute } = require('../src/data_type/attribute');
const { DocumentDetails } = require('../src/data_type/document.details');

function parseAnchorData(anchorString) {
  const anchorObj = protoRoot.builder.attrpubapi_v1.Anchor.decode(anchorString);
  return AnchorProcessor.process([anchorObj]);
}

describe('Attribute', () => {
  const documentDetails = new DocumentDetails('PASSPORT GBR 01234567 2020-01-01');
  const dlSourceAnchor = fs.readFileSync('./tests/sample-data/yoti-common/dl-source-anchor.txt', 'utf8');
  const verifierAnchor = fs.readFileSync('./tests/sample-data/yoti-common/verifier-anchor.txt', 'utf8');
  const attributeObj = new Attribute({
    value: documentDetails,
    name: 'document_details',
    sources: parseAnchorData(dlSourceAnchor).sources,
    verifiers: parseAnchorData(verifierAnchor).verifiers,
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
      expect(attributeObj.getSources()[0].getValue()).to.equal('DRIVING_LICENCE');
      expect(attributeObj.getSources()[0].getSubType()).to.equal('');
      expect(attributeObj.getSources()[0].getSignedTimeStamp().getTimestamp()
        .toUTCString()).to.equal('Wed, 11 Apr 2018 12:13:03 GMT');
      expect(attributeObj.getSources()[0].getOriginServerCerts()[0].signatureOid).to.equal('1.2.840.113549.1.1.11');
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
