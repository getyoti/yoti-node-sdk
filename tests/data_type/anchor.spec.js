const { YotiAnchor } = require('../../src/data_type/anchor');
const { YotiDate } = require('../../src/data_type/date');
const { YotiSignedTimeStamp } = require('../../src/data_type/signed.timestamp');

describe('YotiAnchor', () => {
  const signedTimestamp = new YotiSignedTimeStamp(1, new YotiDate(1067950267923530));
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

  describe('#getType()', () => {
    it('it should return test_type', () => {
      expect(anchor.getType()).toBe('test_type');
    });
  });
  describe('#getValue()', () => {
    it('it should return test_value', () => {
      expect(anchor.getValue()).toBe('test_value');
    });
  });
  describe('#getSubType()', () => {
    it('it should return test_sub_type', () => {
      expect(anchor.getSubType()).toBe('test_sub_type');
    });
  });
  describe('#getSignedTimeStamp()', () => {
    it('it should return timestamp', () => {
      expect(anchor.getSignedTimeStamp()).toBe(signedTimestamp);
    });
  });
  describe('#getOriginServerCerts()', () => {
    it('it should return origin server certs', () => {
      expect(anchor.getOriginServerCerts()).toBe(originServerCerts);
    });
  });
});
