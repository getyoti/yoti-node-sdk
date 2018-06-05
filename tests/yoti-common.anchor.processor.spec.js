const fs = require('fs');
const AnchorProcessor = require('../src/yoti_common/anchor.processor').AnchorProcessor;
const protoRoot = require('../src/proto-root').initializeProtoBufObjects();
const forge = require('node-forge');
const ByteBuffer = require("bytebuffer");
const expect = require('chai').expect;

describe('anchorProcessor', () => {
  describe('#process', () => {

    context('when processing DL Source Anchor data', () => {
      const dlSourceAnchor = fs.readFileSync('./tests/sample-data/yoti-common/dl-source-anchor.txt', 'utf8');

      it('should return DRIVING_LICENCE as value', () => {
        const expectedSourceValue = 'DRIVING_LICENCE';
        const dlAnchorObj = parseAnchorData(dlSourceAnchor);
        const anchorSources = AnchorProcessor.process([dlAnchorObj]);
        const anchorValue = anchorSources['sources'][0].getValue();

        expect(anchorValue).to.equal(expectedSourceValue);
      });
    });

    context('when processing Passport Source Anchor data', () => {
      const ppSourceAnchor = fs.readFileSync('./tests/sample-data/yoti-common/pp-source-anchor.txt', 'utf8');

      it('should return PASSPORT as value', () => {
        const expectedSourceValue = 'PASSPORT';
        const ppAnchorObj = parseAnchorData(ppSourceAnchor);
        const anchorSources = AnchorProcessor.process([ppAnchorObj]);
        const anchorValue = anchorSources['sources'][0].getValue();

        expect(anchorValue).to.equal(expectedSourceValue);
      });
    });

    context('when processing duplicate Source Anchors', () => {
      const ppSourceAnchor = fs.readFileSync('./tests/sample-data/yoti-common/pp-source-anchor.txt', 'utf8');

      it('should return a unique Anchor value', () => {
        const expectedSourceValue = ['PASSPORT'];
        const ppAnchorObj = parseAnchorData(ppSourceAnchor);
        const anchorSources = AnchorProcessor.process([ppAnchorObj, ppAnchorObj]);

        const anchorValues = [];
        for(let i = 0; i < anchorSources['sources'].length; i++) {
          anchorValues.push(anchorSources['sources'][i].getValue());
        }

        expect(JSON.stringify(anchorValues)).to.equal(JSON.stringify(expectedSourceValue));
      });
    });

    context('when processing Verifier Anchor data', () => {
      const verifierAnchor = fs.readFileSync('./tests/sample-data/yoti-common/verifier-anchor.txt', 'utf8');

      it('should return YOTI_ADMIN as value', () => {
        const expectedAnchorValue = 'YOTI_ADMIN';
        const AnchorObj = parseAnchorData(verifierAnchor);
        const anchorVerifiers = AnchorProcessor.process([AnchorObj]);
        const anchorValue = anchorVerifiers['verifiers'][0].getValue();

        expect(anchorValue).to.equal(expectedAnchorValue);
      });
    });

  });
});

function parseAnchorData(anchorString) {
  const decodedData = protoRoot.decodeEncryptedData(anchorString);
  const cipherText = forge.util.decode64(decodedData.cipherText);
  const AnchorBuf = Buffer.from(cipherText, 'binary');
  const byteBuffer = ByteBuffer.wrap(AnchorBuf);
  const AnchorObj = {
    'originServerCerts': [byteBuffer]
  };

  return AnchorObj;
}