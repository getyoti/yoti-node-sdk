'use strict';

const { types } = require('../../../src/proto');
const DataEntryConverter = require('../../../src/yoti_common/converters/data.entry.converter');

describe('DataEntryConverter', () => {
  describe('#convertValue', () => {
    it('should return undefined if no value supplied', () => {
      const dataEntryProto = types.DataEntry.encode({
        type: 6,
      }).finish;

      const dataEntry = DataEntryConverter.convertValue(dataEntryProto.type, dataEntryProto.value);

      expect(dataEntry).toBe(undefined);
    });

    it('should return undefined if unknown type', () => {
      const dataEntry = DataEntryConverter.convertValue(-1, 'someValue');

      expect(dataEntry).toBe(undefined);
    });
  });
});
