import { decryptReceiptContent } from './decryption.utils';
import { decodeAttributeList } from '../../proto/messages';
import { AttributeListConverter } from '../../yoti_common/converters/attribute.list.converter';
import ApplicationContent = require('./application.content');
import UserContent = require('./user.content');
import ExtraDataConverter = require('../../yoti_common/converters/extra.data.converter');

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

export {
  buildApplicationContentFromEncryptedContent,
  buildUserContentFromEncryptedContent,
};
