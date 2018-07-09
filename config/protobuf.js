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

module.exports = {
  PROTO_BUFF_PATH,
  PROTO_BUFF_ATTRIBUTE_API_PATH,
  CORE_ATTRIBUTE_LIST_PROTO_BUFF_PATH,
  PROTO_BUFF_COMMON_API_PATH,
  CORE_ENCRYPTED_DATA_PROTO_BUFF_PATH,
  CORE_SIGNED_TIMESTAMP_PROTO__BUFF_PATH,
};
