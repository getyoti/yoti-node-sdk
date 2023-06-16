'use strict';

const { messages } = require('../../proto');
const DataEntryConverter = require('./data.entry.converter');

class ExtraDataConverter {
  static convertExtraData(extraDataBytes) {
    let extraDataProto;
    try {
      extraDataProto = messages.decodeExtraData(extraDataBytes);
    } catch (err) {
      console.log(`Failed to parse extra data: ${err}`);
      return undefined;
    }

    const dataEntries = extraDataProto.list;
    return dataEntries.map((entry) => DataEntryConverter
      .convertValue(entry.type, entry.value))
      .filter((i) => i !== undefined);
  }
}

module.exports = ExtraDataConverter;
