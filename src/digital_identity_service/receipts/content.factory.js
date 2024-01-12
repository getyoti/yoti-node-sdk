'use strict';

const { decryptReceiptContent } = require('./decryption.utils');
const { decodeAttributeList } = require('../../proto/messages');
const { AttributeListConverter } = require('../../yoti_common/converters/attribute.list.converter');
const ApplicationContent = require('./application.content');
const UserContent = require('./user.content');
const ExtraDataConverter = require('../../yoti_common/converters/extra.data.converter');

/**
 *
 * @param {Object} contentData
 * @param {string} contentData.profile
 * @param {string} contentData.extraData
 * @param {Buffer} receiptContentKey
 * @returns {{extraData: (*), attributes: { [k: string]: any }[]}}
 */
function decryptAndExtractContentData(
  { profile, extraData } = { profile: '', extraData: '' },
  receiptContentKey
) {
  const decryptedProfile = decryptReceiptContent(profile, receiptContentKey);
  const decryptedExtraData = decryptReceiptContent(extraData, receiptContentKey);

  let attributes;
  let extractedExtraData;

  if (decryptedProfile) {
    const { attributes: decodedProfileAttributes } = decodeAttributeList(decryptedProfile);
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
 * @param {{profile, extraData}} content  encrypted profile content
 * @param receiptContentKey
 * @returns {ApplicationContent}
 */
function buildApplicationContentFromEncryptedContent(content = { profile: '', extraData: '' }, receiptContentKey) {
  const { attributes, extraData } = decryptAndExtractContentData(
    content,
    receiptContentKey
  );
  return new ApplicationContent(attributes, extraData);
}

/**
 *
 * @param {{profile, extraData}} content encrypted profile content
 * @param receiptContentKey
 * @returns {UserContent}
 */
function buildUserContentFromEncryptedContent(content = { profile: '', extraData: '' }, receiptContentKey) {
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
