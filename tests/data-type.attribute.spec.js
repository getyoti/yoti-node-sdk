const fs = require('fs');
const expect = require('chai').expect;
const protoRoot = require('../src/proto-root').initializeProtoBufObjects();

const {Attribute} = require('../src/data_type/attribute');
const {DocumentDetails} = require('../src/data_type/document.details');

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
    verifiers: [parseAnchorData(verifierAnchor)]
  });

  context('Attribute.getValue()', (done) => {
    it('it should return DocumentDetails instance', () => {
      expect(attributeObj.getValue()).to.be.an.instanceof(DocumentDetails);
    });
  });
  context('Attribute.getName()', (done) => {
    it('it should return document_details', () => {
      expect(attributeObj.getName()).to.equal('document_details');
    });
  });
  context('Attribute.getSources()[0]', (done) => {
    it('it should return an Anchor object', () => {
      expect(attributeObj.getSources()[0]).to.be.an('object');
    });
  });
  context('Attribute.getVerifiers()[0]', (done) => {
    it('it should return an Anchor object', () => {
      expect(attributeObj.getSources()[0]).to.be.an('object');
    });
  });
});