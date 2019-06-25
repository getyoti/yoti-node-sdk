const fs = require('fs');
const expect = require('chai').expect;
const protoRoot = require('../../src/proto-root').initializeProtoBufObjects();
const AnchorProcessor = require('../../src/yoti_common/anchor.processor').AnchorProcessor;

const { Attribute } = require('../../src/data_type/attribute');
const { DocumentDetails } = require('../../src/data_type/document.details');

function parseAnchorData(anchorString) {
  const anchorObj = protoRoot.builder.attrpubapi_v1.Anchor.decode(anchorString);
  return AnchorProcessor.process([anchorObj]);
}

describe('Attribute', () => {
  const documentDetails = new DocumentDetails('PASSPORT GBR 01234567 2020-01-01');
  const dlSourceAnchor = fs.readFileSync('./tests/sample-data/yoti-common/dl-source-anchor.txt', 'utf8');
  const verifierAnchor = fs.readFileSync('./tests/sample-data/yoti-common/verifier-anchor.txt', 'utf8');
  const unknownAnchor = fs.readFileSync('./tests/sample-data/yoti-common/unknown-anchor.txt', 'utf8');
  const sources = parseAnchorData(dlSourceAnchor).sources;
  const verifiers = parseAnchorData(verifierAnchor).verifiers;
  const anchors = {
    sources,
    verifiers,
    unknown: parseAnchorData(unknownAnchor).unknown,
  };
  const attributeObj = new Attribute({
    value: documentDetails,
    name: 'document_details',
    sources,
    verifiers,
    anchors,
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
      const source = attributeObj.getSources()[0];
      expect(source).to.be.an('object');
      expect(source.getType()).to.equal('SOURCE');
      expect(source.getValue()).to.equal('DRIVING_LICENCE');
      expect(source.getSubType()).to.equal('');
      expect(source.getSignedTimeStamp().getTimestamp()
        .toUTCString()).to.equal('Wed, 11 Apr 2018 12:13:03 GMT');
      expect(source.getOriginServerCerts()[0].signatureOid).to.equal('1.2.840.113549.1.1.11');
    });
  });
  context('Attribute.getVerifiers()[0]', () => {
    it('it should return an Anchor object', () => {
      const verifier = attributeObj.getVerifiers()[0];
      expect(verifier).to.be.an('object');
      expect(verifier.getType()).to.equal('VERIFIER');
      expect(verifier.getValue()).to.equal('YOTI_ADMIN');
      expect(verifier.getSubType()).to.equal('');
      expect(verifier.getSignedTimeStamp().getTimestamp()
        .toUTCString()).to.equal('Wed, 11 Apr 2018 12:13:04 GMT');
      expect(verifier.getOriginServerCerts()[0].signatureOid).to.equal('1.2.840.113549.1.1.11');
    });
  });
  context('Attribute.getAnchors()', () => {
    it('it should return an array of Anchor objects', () => {
      const source = attributeObj.getAnchors()[0];
      const verifier = attributeObj.getAnchors()[1];
      const unknown = attributeObj.getAnchors()[2];
      expect(source.getType()).to.equal('SOURCE');
      expect(verifier.getType()).to.equal('VERIFIER');
      expect(unknown.getType()).to.equal('UNKNOWN');
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
