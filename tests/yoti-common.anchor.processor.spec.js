const fs = require('fs');
const AnchorProcessor = require('../src/yoti_common/anchor.processor').AnchorProcessor;
const protoRoot = require('../src/proto-root').initializeProtoBufObjects();
const forge = require('node-forge');
const ByteBuffer = require("bytebuffer");
const expect = require('chai').expect;

const ppAnchorSource = fs.readFileSync('./tests/yoti-common/pp-anchor-source.txt', 'utf8');

describe('anchorProcessor', () => {
  describe('#process', () => {
    it('should return PASSPORT as source value', () => {
      const expectedSourceValue = 'PASSPORT';
      const attr2 = protoRoot.decodeEncryptedData(ppAnchorSource);

      const iv = forge.util.decode64(attr2.iv);
      const cipherText = forge.util.decode64(attr2.cipherText);
      let ppanchor = Buffer.from(cipherText, 'binary');

      const buf = new Buffer(ppanchor);
      const byteBuffer = ByteBuffer.wrap(buf);

      const anchor = {
        'originServerCerts': [byteBuffer]
      };

      const anchorSources = AnchorProcessor.process([anchor]);
      const SourceValue = anchorSources['sources'][0].getValue();
      expect(SourceValue).to.equal(expectedSourceValue);
    });
  });
});