const { YotiDate } = require('../../src/data_type/date');
const { YotiSignedTimeStamp } = require('../../src/data_type/signed.timestamp');

describe('YotiSignedTimeStamp', () => {
  const signedTimestamp = new YotiSignedTimeStamp(1, new YotiDate(1067950267923530));

  describe('#constructor()', () => {
    it('should only accept YotiDate as timestamp', () => {
      expect(() => new YotiSignedTimeStamp(0, new Date()))
        .toThrow(new TypeError('timestamp must be instance of YotiDate'));
    });
  });
  describe('#getVersion()', () => {
    it('should return 1', () => {
      expect(signedTimestamp.getVersion()).toBe(1);
    });
  });
  describe('#getTimestamp()', () => {
    it('should return Date object', () => {
      const timestamp = signedTimestamp.getTimestamp();
      expect(timestamp).toBeInstanceOf(YotiDate);
      expect(timestamp).toBeInstanceOf(Date);
      expect(timestamp.toUTCString()).toBe('Tue, 04 Nov 2003 12:51:07 GMT');
      expect(timestamp.getMicrosecondTimestamp()).toBe('2003-11-04T12:51:07.923530Z');
    });
  });
});
