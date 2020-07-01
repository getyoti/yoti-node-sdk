'use strict';

const protoRoot = require('../proto-root');
const DataEntryConverter = require('./data.entry.converter');
const ExtraData = require('../profile_service/extra.data');

const protoInst = protoRoot.initializeProtoBufObjects();

class ExtraDataConverter {
  static convertExtraData(extraDataBytes) {
    let extraDataProto;
    try {
      extraDataProto = protoInst.decodeExtraData(extraDataBytes);
    } catch (err) {
      console.log(`Failed to parse extra data: ${err}`);
      return new ExtraData();
    }

    const dataEntries = extraDataProto.list;
    const parsed = dataEntries.map((entry) => DataEntryConverter
      .convertValue(entry.type, entry.value))
      .filter((i) => i !== undefined);

    return new ExtraData(parsed);
  }
}

module.exports = ExtraDataConverter;
