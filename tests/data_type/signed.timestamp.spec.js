const { expect } = require('chai');
const { YotiDate } = require('../../src/data_type/date');
const { YotiSignedTimeStamp } = require('../../src/data_type/signed.timestamp');

describe('YotiSignedTimeStamp', () => {
  const signedTimestamp = new YotiSignedTimeStamp(1, new YotiDate(1067950267923530));

  context('#constructor()', () => {
    it('should only accept YotiDate as timestamp', () => {
      expect(() => new YotiSignedTimeStamp(0, new Date()))
        .to.throw(TypeError, 'timestamp must be instance of YotiDate');
    });
  });
  context('#getVersion()', () => {
    it('should return 1', () => {
      expect(signedTimestamp.getVersion()).to.equal(1);
    });
  });
  context('#getTimestamp()', () => {
    it('should return Date object', () => {
      const timestamp = signedTimestamp.getTimestamp();
      expect(timestamp).to.be.a('Date');
      expect(timestamp).to.be.instanceOf(YotiDate);
      expect(timestamp).to.be.instanceOf(Date);
      expect(timestamp.toUTCString()).to.equal('Tue, 04 Nov 2003 12:51:07 GMT');
      expect(timestamp.getMicrosecondTimestamp()).to.equal('2003-10-04T12:51:07.923530Z');
    });
  });
});
