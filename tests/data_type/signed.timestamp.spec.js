const expect = require('chai').expect;

const { YotiSignedTimeStamp } = require('../../src/data_type/signed.timestamp');

describe('YotiSignedTimeStamp', () => {
  const signedTimestamp = new YotiSignedTimeStamp(1, new Date('2003-11-04T12:51:07Z'));

  context('#getVersion()', () => {
    it('it should return 1', () => {
      expect(signedTimestamp.getVersion()).to.equal(1);
    });
  });
  context('#getTimestamp()', () => {
    it('it should return Date object', () => {
      expect(signedTimestamp.getTimestamp()).to.be.a('Date');
      expect(signedTimestamp.getTimestamp().toUTCString()).to.equal('Tue, 04 Nov 2003 12:51:07 GMT');
    });
  });
});
