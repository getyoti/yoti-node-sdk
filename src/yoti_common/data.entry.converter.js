'use strict';

const ThirdPartyAttributeConverter = require('./third.party.attribute.converter');

const DATA_ENTRY_THIRD_PARTY_ATTRIBUTE = 6;

class DataEntryConverter {
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
