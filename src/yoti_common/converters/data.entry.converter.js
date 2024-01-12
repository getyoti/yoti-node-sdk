'use strict';

const ThirdPartyAttributeConverter = require('./third.party.attribute.converter');

const DATA_ENTRY_THIRD_PARTY_ATTRIBUTE = 6;

/**
 * @typedef {import('./../../data_type/attribute.issuance.details')} AttributeIssuanceDetails
 */

class DataEntryConverter {
  /**
   * @param type
   * @param value
   * @returns {AttributeIssuanceDetails|undefined}
   */
  static convertValue(type, value) {
    if (!value) {
      console.log('No value supplied by data entry, skipping');
      return undefined;
    }

    switch (type) {
      case DATA_ENTRY_THIRD_PARTY_ATTRIBUTE:
        return ThirdPartyAttributeConverter
          .convertThirdPartyAttribute(value);
      default:
        console.log("Skipping data entry, as it's currently unsupported by the SDK");
        return undefined;
    }
  }
}

module.exports = DataEntryConverter;
