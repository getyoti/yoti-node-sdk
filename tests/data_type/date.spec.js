const { YotiDate } = require('../../src/data_type/date');

describe('YotiDate', () => {
  const date = new YotiDate(1067950267923530);

  describe('#toUTCString()', () => {
    it('should return Tue, 04 Nov 2003 12:51:07 GMT', () => {
      expect(date.toUTCString()).toBe('Tue, 04 Nov 2003 12:51:07 GMT');
    });
  });

  describe('#getMicrosecondTime', () => {
    const smallDate = new YotiDate(1571630945010000);
    it('should return zero padded in correct ISO format', () => {
      expect(smallDate.getMicrosecondTime()).toBe('04:09:05.010000');
    });
  });

  describe('#getMicroseconds()', () => {
    it('should return 923530', () => {
      expect(date.getMicroseconds()).toBe(923530);
      expect(date.getMicrosecondTime()).toBe('12:51:07.923530');
      expect(date.getMicrosecondTimestamp()).toBe('2003-11-04T12:51:07.923530Z');
    });
  });
});
