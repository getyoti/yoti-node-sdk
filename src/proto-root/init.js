'use strict';

const utils = require('./utils');
const attributeList = require('./proto.attribute.list');
const commonEncryptedData = require('./proto.common.encrypted-data');
const signedTimeStamp = require('./proto.signed.timestamp');

const ProtoBuf = require('protobufjs');
const serverConfig = require('../../config/protobuf');

let instance;

function initProtoBufBuilder() {
  const builder = ProtoBuf.newBuilder({ convertFieldsToCamelCase: true });
  const attributeListPath = serverConfig.CORE_ATTRIBUTE_LIST_PROTO_BUFF_PATH;
  const encryptedData = serverConfig.CORE_ENCRYPTED_DATA_PROTO_BUFF_PATH;
  const signedTimeStampStructure = serverConfig.CORE_SIGNED_TIMESTAMP_PROTO__BUFF_PATH;

  ProtoBuf.loadProtoFile(attributeListPath, builder);
  ProtoBuf.loadProtoFile(encryptedData, builder);
  ProtoBuf.loadProtoFile(signedTimeStampStructure, builder);

  return {
    builder: builder.build(),
  };
}

function buildProtoBufObject() {
  return Object.assign(
    {},
    initProtoBufBuilder(),
    utils,
    attributeList,
    commonEncryptedData,
    signedTimeStamp

);
}

module.exports.getInstance = () => {
  if (!instance) {
    instance = buildProtoBufObject();
  }
  return instance;
};
