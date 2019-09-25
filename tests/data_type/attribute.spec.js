const fs = require('fs');
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

  describe('Attribute.getValue()', () => {
    it('it should return DocumentDetails instance', () => {
      expect(attributeObj.getValue()).toBeInstanceOf(DocumentDetails);
    });
  });
  describe('Attribute.getName()', () => {
    it('it should return document_details', () => {
      expect(attributeObj.getName()).toBe('document_details');
    });
  });
  describe('Attribute.getSources()[0]', () => {
    it('it should return an Anchor object', () => {
      const source = attributeObj.getSources()[0];
      expect(source).toBeInstanceOf(Object);
      expect(source.getType()).toBe('SOURCE');
      expect(source.getValue()).toBe('DRIVING_LICENCE');
      expect(source.getSubType()).toBe('');
      expect(source.getSignedTimeStamp().getTimestamp()
        .toUTCString()).toBe('Wed, 11 Apr 2018 12:13:03 GMT');
      expect(source.getOriginServerCerts()[0].signatureOid).toBe('1.2.840.113549.1.1.11');
    });
  });
  describe('Attribute.getVerifiers()[0]', () => {
    it('it should return an Anchor object', () => {
      const verifier = attributeObj.getVerifiers()[0];
      expect(verifier).toBeInstanceOf(Object);
      expect(verifier.getType()).toBe('VERIFIER');
      expect(verifier.getValue()).toBe('YOTI_ADMIN');
      expect(verifier.getSubType()).toBe('');
      expect(verifier.getSignedTimeStamp().getTimestamp()
        .toUTCString()).toBe('Wed, 11 Apr 2018 12:13:04 GMT');
      expect(verifier.getOriginServerCerts()[0].signatureOid).toBe('1.2.840.113549.1.1.11');
    });
  });
  describe('Attribute.getAnchors()', () => {
    it('it should return an array of Anchor objects', () => {
      const source = attributeObj.getAnchors()[0];
      const verifier = attributeObj.getAnchors()[1];
      const unknown = attributeObj.getAnchors()[2];
      expect(attributeObj.getAnchors()).toHaveLength(3);
      expect(source.getType()).toBe('SOURCE');
      expect(verifier.getType()).toBe('VERIFIER');
      expect(unknown.getType()).toBe('UNKNOWN');
    });
  });
  describe('When Attribute value is a DocumentDetails', () => {
    it('it should return PASSPORT as type', () => {
      expect(attributeObj.getValue().getType()).toBe('PASSPORT');
    });
    it('it should return GBR as Issuing country', () => {
      expect(attributeObj.getValue().getIssuingCountry()).toBe('GBR');
    });
    it('it should return 01234567 as documentNumber', () => {
      expect(attributeObj.getValue().getDocumentNumber()).toBe('01234567');
    });
    it('it should return 2020-01-01 as expiration Date', () => {
      expect(attributeObj.getValue().getExpirationDate().toISOString().slice(0, 10)).toBe('2020-01-01');
    });
  });
});
