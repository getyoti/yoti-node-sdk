'use strict';

const ProtoBuf = require('protobufjs');

const utils = require('./utils');
const attributeList = require('./proto.attribute.list');
const commonEncryptedData = require('./proto.common.encrypted-data');
const signedTimeStamp = require('./proto.signed.timestamp');

const extraData = require('./proto.share.extra-data');
const thirdPartyAttribute = require('./proto.share.third-party-attribute');

const serverConfig = require('../../config/protobuf');

let instance;

function initProtoBufBuilder() {
  const attributeListPath = serverConfig.CORE_ATTRIBUTE_LIST_PROTO_BUFF_PATH;
  const encryptedData = serverConfig.CORE_ENCRYPTED_DATA_PROTO_BUFF_PATH;
  const signedTimeStampStructure = serverConfig.CORE_SIGNED_TIMESTAMP_PROTO__BUFF_PATH;

  const extraDataStructure = serverConfig.CORE_EXTRA_DATA_PROTO_BUFF_PATH;
  const dataEntryStructure = serverConfig.CORE_DATA_ENTRY_PROTO_BUFF_PATH;
  const issuingAttributesStructure = serverConfig.CORE_ISSUING_ATTRIBUTES_PROTO_BUFF_PATH;
  const thirdPartyAttributeStructure = serverConfig.CORE_THIRD_PARTY_ATTRIBUTE_PROTO_BUFF_PATH;

  const loaded = ProtoBuf.loadSync([
    attributeListPath,
    encryptedData,
    signedTimeStampStructure,
    extraDataStructure,
    dataEntryStructure,
    thirdPartyAttributeStructure,
    issuingAttributesStructure,
  ]);

  return {
    builder: loaded,
  };
}

function buildProtoBufObject() {
  return Object.assign(
    {},
    initProtoBufBuilder(),
    utils,
    attributeList,
    commonEncryptedData,
    signedTimeStamp,
    extraData,
    thirdPartyAttribute
  );
}

module.exports.getInstance = () => {
  if (!instance) {
    instance = buildProtoBufObject();
  }
  return instance;
};
