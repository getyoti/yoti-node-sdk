const fs = require('fs');
const AnchorProcessor = require('../../src/yoti_common/anchor.processor').AnchorProcessor;
const protoRoot = require('../../src/proto-root').initializeProtoBufObjects();
const expect = require('chai').expect;

function parseAnchorData(anchorString) {
  return protoRoot.builder.attrpubapi_v1.Anchor.decode(anchorString);
}

describe('anchorProcessor', () => {
  describe('#process', () => {
    context('when processing DL Source Anchor data', () => {
      const dlSourceAnchor = fs.readFileSync('./tests/sample-data/yoti-common/dl-source-anchor.txt', 'utf8');

      it('should return DRIVING_LICENCE as value', () => {
        const expectedSourceValue = 'DRIVING_LICENCE';
        const dlAnchorObj = parseAnchorData(dlSourceAnchor);
        const anchorSources = AnchorProcessor.process([dlAnchorObj]);
        const anchorValue = anchorSources.sources[0].getValue();
        expect(anchorValue).to.equal(expectedSourceValue);
      });
    });

    context('when processing Passport Source Anchor data', () => {
      const ppSourceAnchor = fs.readFileSync('./tests/sample-data/yoti-common/pp-source-anchor.txt', 'utf8');
      const ppAnchorObj = parseAnchorData(ppSourceAnchor);
      const anchorSources = AnchorProcessor.process([ppAnchorObj]);
      const firstSource = anchorSources.sources[0];

      it('should return PASSPORT as value', () => {
        const expectedSourceValue = 'PASSPORT';
        const anchorValue = firstSource.getValue();
        expect(anchorValue).to.equal(expectedSourceValue);
      });

      it('should return OCR as subType', () => {
        const expectedSubType = 'OCR';
        const subType = firstSource.getSubType();
        expect(subType).to.equal(expectedSubType);
      });

      it('should return Thu, 12 Apr 2018 13:14:32 GMT as timestamp', () => {
        const expectedTimestamp = 'Thu, 12 Apr 2018 13:14:32 GMT';
        const timestamp = firstSource.getSignedTimeStamp().getTimestamp();
        expect(timestamp).to.be.a('Date');
        expect(timestamp).to.be.instanceOf(Date);
        expect(timestamp.toUTCString()).to.equal(expectedTimestamp);
        expect(timestamp.getMicrosecondTimestamp()).to.equal('2018-04-12T13:14:32.835537Z');
      });

      it('should return 1.2.840.113549.1.1.11 as signature Oid', () => {
        const expectedCertificate = '1.2.840.113549.1.1.11';
        const certificates = firstSource.getOriginServerCerts();
        expect(expectedCertificate).to.equal(certificates[0].signatureOid);
      });
    });

    context('when processing Verifier Anchor data', () => {
      const verifierAnchor = fs.readFileSync('./tests/sample-data/yoti-common/verifier-anchor.txt', 'utf8');
      const AnchorObj = parseAnchorData(verifierAnchor);
      const anchorVerifiers = AnchorProcessor.process([AnchorObj]);
      const firstVerifier = anchorVerifiers.verifiers[0];

      it('should return YOTI_ADMIN as value', () => {
        const expectedAnchorValue = 'YOTI_ADMIN';
        const anchorValue = firstVerifier.getValue();
        expect(anchorValue).to.equal(expectedAnchorValue);
      });

      it('should return empty subType', () => {
        const expectedSubType = '';
        const subType = firstVerifier.getSubType();
        expect(subType).to.equal(expectedSubType);
      });

      it('should return Wed, 11 Apr 2018 12:13:04 GMT as timestamp', () => {
        const expectedTimestamp = 'Wed, 11 Apr 2018 12:13:04 GMT';
        const timestamp = firstVerifier.getSignedTimeStamp().getTimestamp();
        expect(timestamp).to.be.a('Date');
        expect(timestamp).to.be.instanceOf(Date);
        expect(timestamp.toUTCString()).to.equal(expectedTimestamp);
        expect(timestamp.getMicrosecondTimestamp()).to.equal('2018-04-11T12:13:04.095238Z');
      });

      it('should return 1.2.840.113549.1.1.11 as signature Oid', () => {
        const expectedCertificate = '1.2.840.113549.1.1.11';
        const certificates = firstVerifier.getOriginServerCerts();
        expect(expectedCertificate).to.equal(certificates[0].signatureOid);
      });
    });

    context('when processing unknown anchor data', () => {
      const unknownAnchorData = fs.readFileSync('./tests/sample-data/yoti-common/unknown-anchor.txt', 'utf8');
      const unknownAnchorObj = parseAnchorData(unknownAnchorData);
      const anchors = AnchorProcessor.process([unknownAnchorObj]);
      const unknownAnchor = anchors.unknown[0];

      it('should return empty string as value', () => {
        expect(unknownAnchor.getValue()).to.equal('');
      });

      it('should return UNKNOWN as type', () => {
        expect(unknownAnchor.getType()).to.equal('UNKNOWN');
      });

      it('should return Wed, 11 Apr 2018 12:13:03 GMT as timestamp', () => {
        expect(unknownAnchor.getSignedTimeStamp().getTimestamp().toUTCString())
          .to.equal('Tue, 05 Mar 2019 10:45:11 GMT');
      });

      it('should return empty subType', () => {
        expect(unknownAnchor.getSubType()).to.equal('TEST UNKNOWN SUB TYPE');
      });

      it('should return 1.2.840.113549.1.1.11 as signature Oid', () => {
        const expectedCertificate = '1.2.840.113549.1.1.11';
        const certificates = unknownAnchor.getOriginServerCerts();
        expect(expectedCertificate).to.equal(certificates[0].signatureOid);
      });
    });

    context('when processing multiple anchors', () => {
      const dlSourceAnchor = fs.readFileSync('./tests/sample-data/yoti-common/dl-source-anchor.txt', 'utf8');
      const verifierAnchor = fs.readFileSync('./tests/sample-data/yoti-common/verifier-anchor.txt', 'utf8');
      const unknownAnchor = fs.readFileSync('./tests/sample-data/yoti-common/unknown-anchor.txt', 'utf8');

      const anchors = AnchorProcessor.process([
        parseAnchorData(dlSourceAnchor),
        parseAnchorData(verifierAnchor),
        parseAnchorData(unknownAnchor),
      ]);

      it('should return 1 source anchor', () => {
        expect(anchors.sources).to.be.length(1);
        expect(anchors.sources[0].getType()).to.equal('SOURCE');
      });

      it('should return 1 verifier anchor', () => {
        expect(anchors.verifiers).to.be.length(1);
        expect(anchors.verifiers[0].getType()).to.equal('VERIFIER');
      });

      it('should return 1 unknown anchor', () => {
        expect(anchors.unknown).to.be.length(1);
        expect(anchors.unknown[0].getType()).to.equal('UNKNOWN');
      });
    });
  });
  describe('#getAnchorByOid', () => {
    context('when processing DL Source Anchor data', () => {
      const sourceAnchor = fs.readFileSync('./tests/sample-data/yoti-common/dl-source-anchor.txt', 'utf8');

      it('should return DRIVING_LICENCE as value', () => {
        const data = parseAnchorData(sourceAnchor);
        const certificateObj = AnchorProcessor.convertCertToX509(data.originServerCerts[0]);
        const anchor = AnchorProcessor.getAnchorByOid(
          certificateObj.extensions,
          data.getSubType(),
          AnchorProcessor.processSignedTimeStamp(data.getSignedTimeStamp()),
          AnchorProcessor.convertCertsListToX509(data.originServerCerts),
          '1.3.6.1.4.1.47127.1.1.1'
        );

        expect(anchor.getValue()).to.equal('DRIVING_LICENCE');
      });
    });
  });
});
