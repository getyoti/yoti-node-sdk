'use strict';

const { messages } = require('../../proto');
const DataEntryConverter = require('./data.entry.converter');

/**
 * @typedef {import('./../../data_type/attribute.issuance.details')} AttributeIssuanceDetails
 */

class ExtraDataConverter {
  /**
   * @param {Buffer} extraDataBytes
   * @returns {(AttributeIssuanceDetails|undefined)[]|undefined}
   */
  static convertExtraData(extraDataBytes) {
    let extraDataProto;
    try {
      extraDataProto = /** @type {any} */ (messages.decodeExtraData(extraDataBytes));
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
