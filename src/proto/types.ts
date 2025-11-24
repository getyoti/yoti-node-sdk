import root = require('./root');

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

const rootProto = root as any;
const types = {
  Anchor: rootProto.lookupType(ANCHOR_PATH),
  Attribute: rootProto.lookupType(ATTRIBUTE_PATH),
  AttributeList: rootProto.lookupType(ATTRIBUTE_LIST_PATH),
  MultiValue: rootProto.lookupType(MULTI_VALUE_PATH),
  EncryptedData: rootProto.lookupType(ENCRYPTED_DATA_PATH),
  DataEntry: rootProto.lookupType(DATA_ENTRY_PATH),
  ExtraData: rootProto.lookupType(EXTRA_DATA_PATH),
  ThirdPartyAttribute: rootProto.lookupType(THIRD_PARTY_ATTRIBUTE_PATH),
  SignedTimestamp: rootProto.lookupType(SIGNED_TIMESTAMP_PATH),
};

Object.entries(types).forEach(([typeName, typeValue]) => {
  if (!typeValue) {
    console.warn(`Proto definition for '${typeName}' not found!`);
  }
});

export const { 
  Anchor,
  Attribute,
  AttributeList,
  MultiValue,
  EncryptedData,
  DataEntry,
  ExtraData,
  ThirdPartyAttribute,
  SignedTimestamp,
} = types;

export default types;
