'use strict';

const { decryptReceiptContent } = require('./decryption.utils');
const { AttributeList } = require('../../proto/types');
const { AttributeListConverter } = require('../../yoti_common/converters/attribute.list.converter');
const ApplicationContent = require('./application.content');
const UserContent = require('./user.content');
const ExtraDataConverter = require('../../yoti_common/converters/extra.data.converter');

function decryptAndExtractContentData(
  { profile, extraData } = {},
  receiptContentKey
) {
  const decryptedProfile = decryptReceiptContent(profile, receiptContentKey);
  const decryptedExtraData = decryptReceiptContent(extraData, receiptContentKey);

  let attributes;
  let extractedExtraData;

  if (decryptedProfile) {
    const { attributes: decodedProfileAttributes } = AttributeList.decode(decryptedProfile);
    attributes = AttributeListConverter.convertAttributeList(decodedProfileAttributes);
  }

  if (decryptedExtraData) {
    extractedExtraData = ExtraDataConverter.convertExtraData(decryptedExtraData);
  }

  return {
    attributes,
    extraData: extractedExtraData,
  };
}

/**
 *
 * @param content {profile, extraData} encrypted profile content
 * @param receiptContentKey
 * @returns {ApplicationContent}
 */
function buildApplicationContentFromEncryptedContent(content = {}, receiptContentKey) {
  const { attributes, extraData } = decryptAndExtractContentData(
    content,
    receiptContentKey
  );
  return new ApplicationContent(attributes, extraData);
}

/**
 *
 * @param content {profile, extraData} encrypted profile content
 * @param receiptContentKey
 * @returns {UserContent}
 */
function buildUserContentFromEncryptedContent(content = {}, receiptContentKey) {
  const { attributes, extraData } = decryptAndExtractContentData(
    content,
    receiptContentKey
  );
  return new UserContent(attributes, extraData);
}

module.exports = {
  buildApplicationContentFromEncryptedContent,
  buildUserContentFromEncryptedContent,
};
