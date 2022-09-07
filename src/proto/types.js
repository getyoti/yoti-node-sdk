const root = require('./root');

const ATTRIBUTE_PUB = 'attrpubapi_v1';
const COMMON_PUB = 'compubapi_v1';
const SHARE_PUB = 'sharepubapi_v1';

const ANCHOR_PATH = `${ATTRIBUTE_PUB}.Anchor`;
const ATTRIBUTE_PATH = `${ATTRIBUTE_PUB}.Attribute`;
const ATTRIBUTE_LIST_PATH = `${ATTRIBUTE_PUB}.AttributeList`;
const MULTI_VALUE_PATH = `${ATTRIBUTE_PUB}.MultiValue`;

const ENCRYPTED_DATA_PATH = `${COMMON_PUB}.EncryptedData`;
const SIGNED_TIMESTAMP_PATH = `${COMMON_PUB}.SignedTimestamp`;

const DATA_ENTRY_PATH = `${SHARE_PUB}.DataEntry`;
const EXTRA_DATA_PATH = `${SHARE_PUB}.ExtraData`;
const THIRD_PARTY_ATTRIBUTE_PATH = `${SHARE_PUB}.ThirdPartyAttribute`;

const types = {
  Anchor: root.lookupType(ANCHOR_PATH),
  Attribute: root.lookupType(ATTRIBUTE_PATH),
  AttributeList: root.lookupType(ATTRIBUTE_LIST_PATH),
  MultiValue: root.lookupType(MULTI_VALUE_PATH),
  EncryptedData: root.lookupType(ENCRYPTED_DATA_PATH),
  DataEntry: root.lookupType(DATA_ENTRY_PATH),
  ExtraData: root.lookupType(EXTRA_DATA_PATH),
  ThirdPartyAttribute: root.lookupType(THIRD_PARTY_ATTRIBUTE_PATH),
  SignedTimestamp: root.lookupType(SIGNED_TIMESTAMP_PATH),
};

Object.entries(types).forEach(([typeName, typeValue]) => {
  if (!typeValue) {
    console.warn(`Proto definition for '${typeName}' not found!`);
  }
});

module.exports = types;
