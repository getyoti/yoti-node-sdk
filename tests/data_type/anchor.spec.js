const expect = require('chai').expect;

const { YotiAnchor } = require('../../src/data_type/anchor');
const { YotiSignedTimeStamp } = require('../../src/data_type/signed.timestamp');

describe('YotiAnchor', () => {
  const signedTimestamp = new YotiSignedTimeStamp(1, new Date('2003-11-04T12:51:07Z'));
  const originServerCerts = [{
    version: 2,
    signatureOid: '1.2.840.113549.1.1.11',
  }];
  const anchor = new YotiAnchor(
    'test_type',
    'test_value',
    'test_sub_type',
    signedTimestamp,
    originServerCerts
  );

  context('#getType()', () => {
    it('it should return test_type', () => {
      expect(anchor.getType()).to.equal('test_type');
    });
  });
  context('#getValue()', () => {
    it('it should return test_value', () => {
      expect(anchor.getValue()).to.equal('test_value');
    });
  });
  context('#getSubType()', () => {
    it('it should return test_sub_type', () => {
      expect(anchor.getSubType()).to.equal('test_sub_type');
    });
  });
  context('#getSignedTimeStamp()', () => {
    it('it should return timestamp', () => {
      expect(anchor.getSignedTimeStamp()).to.equal(signedTimestamp);
    });
  });
  context('#getOriginServerCerts()', () => {
    it('it should return origin server certs', () => {
      expect(anchor.getOriginServerCerts()).to.equal(originServerCerts);
    });
  });
});
