'use strict';

const protoRoot = require('../../src/proto-root');
const DataEntryConverter = require('../../src/yoti_common/data.entry.converter');

const protoInst = protoRoot.initializeProtoBufObjects();

describe('DataEntryConverter', () => {
  describe('#convertValue', () => {
    it('should return undefined if no value supplied', () => {
      const dataEntryProto = protoInst.builder.sharepubapi_v1.DataEntry.encode({
        type: 6,
      });

      const dataEntry = DataEntryConverter.convertValue(dataEntryProto.type, dataEntryProto.value);

      expect(dataEntry).toBe(undefined);
    });

    it('should return undefined if unknown type', () => {
      const dataEntry = DataEntryConverter.convertValue(-1, 'someValue');

      expect(dataEntry).toBe(undefined);
    });
  });
});
