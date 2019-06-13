const { expect } = require('chai');
const { YotiDate } = require('../../src/data_type/date');

describe('YotiDate', () => {
  const date = new YotiDate(1067950267923530);

  context('#toUTCString()', () => {
    it('should return Tue, 04 Nov 2003 12:51:07 GMT', () => {
      expect(date.toUTCString()).to.equal('Tue, 04 Nov 2003 12:51:07 GMT');
    });
  });

  context('#getMicroseconds()', () => {
    it('should return 923530', () => {
      expect(date.getMicroseconds()).to.equal(923530);
      expect(date.getMicrosecondTime()).to.equal('12:51:07.923530');
      expect(date.getMicrosecondTimestamp()).to.equal('2003-11-04T12:51:07.923530Z');
    });
  });
});
