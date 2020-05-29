const { YotiDate } = require('../../src/data_type/date');

describe('YotiDate', () => {
  describe('#toUTCString()', () => {
    it('should return Tue, 04 Nov 2003 12:51:07 GMT', () => {
      expect(new YotiDate(1067950267923530).toUTCString())
        .toBe('Tue, 04 Nov 2003 12:51:07 GMT');
    });
  });

  describe('#fromDateString()', () => {
    test.each([
      ['2006-01-02', '2006-01-02T00:00:00.000000Z'],
      ['2006-01-02T22:04:05Z', '2006-01-02T22:04:05.000000Z'],
      ['2006-01-02T22:04:05.1Z', '2006-01-02T22:04:05.100000Z'],
      ['2006-01-02T22:04:05.12Z', '2006-01-02T22:04:05.120000Z'],
      ['2006-01-02T22:04:05.123Z', '2006-01-02T22:04:05.123000Z'],
      ['2006-01-02T22:04:05.1234Z', '2006-01-02T22:04:05.123400Z'],
      ['2006-01-02T22:04:05.12345Z', '2006-01-02T22:04:05.123450Z'],
      ['2006-01-02T22:04:05.123956Z', '2006-01-02T22:04:05.123956Z'],
      ['2006-01-02T22:04:05.123456789Z', '2006-01-02T22:04:05.123456Z'],
      ['2002-10-02T10:00:00-05:00', '2002-10-02T15:00:00.000000Z'],
      ['2002-10-02T10:00:00+11:00', '2002-10-01T23:00:00.000000Z'],
      ['1920-03-13T19:50:53.000001Z', '1920-03-13T19:50:53.000001Z'],
      ['1920-03-13T19:50:53.999999Z', '1920-03-13T19:50:53.999999Z'],
      ['1920-03-13T19:50:53.000100Z', '1920-03-13T19:50:53.000100Z'],
      ['2006-01-02T22:04:05.123956+04:00', '2006-01-02T18:04:05.123956Z'],
      ['2006-01-02T22:04:05.654321-01:00', '2006-01-02T23:04:05.654321Z'],
      ['2006-01-02T22:04:05.654-01:00', '2006-01-02T23:04:05.654000Z'],
      ['2006-01-02T22:04:05-01:00', '2006-01-02T23:04:05.000000Z'],
    ])('%s should convert to RFC-3339 date/time %s', (dateString, expected) => {
      expect(YotiDate.fromDateString(dateString).getMicrosecondTimestamp())
        .toBe(expected);
    });
  });

  describe('#getMicrosecondTime()', () => {
    test.each([
      [-1571630945999999, '19:50:54.000001'],
      [1571630945999999, '04:09:05.999999'],
    ])('%s should have microsecond time %s', (timestamp, microsecondTime) => {
      expect(new YotiDate(parseInt(timestamp, 10)).getMicrosecondTime())
        .toBe(microsecondTime);
    });
  });

  const validTimestamps = [
    [-1571630945999999, '1920-03-13T19:50:54.000001Z'],
    [1571630945999999, '2019-10-21T04:09:05.999999Z'],
  ];

  describe('#getMicrosecondTimestamp()', () => {
    test.each(validTimestamps)(
      '%s unix timestamp should have RFC-3339 date/time string %s',
      (timestamp, dateTimeString) => {
        expect(new YotiDate(timestamp).getMicrosecondTimestamp())
          .toBe(dateTimeString);
      }
    );
  });

  describe('#getMicrosecondUnixTimestamp()', () => {
    test.each(validTimestamps)(
      '%s unix timestamp should be returned for RFC-3339 date/time string %s',
      (timestamp, dateTimeString) => {
        expect(YotiDate.fromDateString(dateTimeString).getMicrosecondUnixTimestamp())
          .toBe(timestamp);
      }
    );
  });

  describe('#getMicroseconds()', () => {
    test.each([
      [-1571630945999999, 1],
      [1571630945999999, 999999],
      [1067950267923530, 923530],
    ])('%s should return %s', (timestamp, microseconds) => {
      expect(new YotiDate(timestamp).getMicroseconds())
        .toBe(microseconds);
    });
  });
});
