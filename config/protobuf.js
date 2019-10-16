'use strict';

const path = require('path');

// Protobuff structures
// ------------------------------------------------------------------------------------------------

const PROTO_BUFF_PATH = path.resolve(`${__dirname}/../src/protobuf/`);
const PROTO_BUFF_ATTRIBUTE_API_PATH = path.resolve(`${PROTO_BUFF_PATH}/attribute-public-api/attrpubapi_v1`);
const CORE_ATTRIBUTE_LIST_PROTO_BUFF_PATH = path.resolve(`${PROTO_BUFF_ATTRIBUTE_API_PATH}/List.proto`);

const PROTO_BUFF_COMMON_API_PATH = path.resolve(`${PROTO_BUFF_PATH}/common-public-api/compubapi_v1`);
const CORE_ENCRYPTED_DATA_PROTO_BUFF_PATH = path.resolve(`${PROTO_BUFF_COMMON_API_PATH}/EncryptedData.proto`);
const CORE_SIGNED_TIMESTAMP_PROTO__BUFF_PATH = path.resolve(`${PROTO_BUFF_COMMON_API_PATH}/SignedTimeStamp.proto`);

const PROTO_BUFF_SHARE_API_PATH = path.resolve(`${PROTO_BUFF_PATH}/share-public-api/sharepubapi_v1`);
const CORE_EXTRA_DATA_PROTO_BUFF_PATH = path.resolve(`${PROTO_BUFF_SHARE_API_PATH}/ExtraData.proto`);
const CORE_DATA_ENTRY_PROTO_BUFF_PATH = path.resolve(`${PROTO_BUFF_SHARE_API_PATH}/DataEntry.proto`);
const CORE_THIRD_PARTY_ATTRIBUTE_PROTO_BUFF_PATH = path.resolve(`${PROTO_BUFF_SHARE_API_PATH}/ThirdPartyAttribute.proto`);
const CORE_ISSUING_ATTRIBUTES_PROTO_BUFF_PATH = path.resolve(`${PROTO_BUFF_SHARE_API_PATH}/IssuingAttributes.proto`);

module.exports = {
  PROTO_BUFF_PATH,
  PROTO_BUFF_ATTRIBUTE_API_PATH,
  CORE_ATTRIBUTE_LIST_PROTO_BUFF_PATH,
  PROTO_BUFF_COMMON_API_PATH,
  CORE_ENCRYPTED_DATA_PROTO_BUFF_PATH,
  CORE_SIGNED_TIMESTAMP_PROTO__BUFF_PATH,
  PROTO_BUFF_SHARE_API_PATH,
  CORE_EXTRA_DATA_PROTO_BUFF_PATH,
  CORE_DATA_ENTRY_PROTO_BUFF_PATH,
  CORE_THIRD_PARTY_ATTRIBUTE_PROTO_BUFF_PATH,
  CORE_ISSUING_ATTRIBUTES_PROTO_BUFF_PATH,
};
