'use strict';

const {
  decryptAESGCM,
  decryptAESCBC,
  decryptAsymmetric,
  decomposeAESGCMCipherText,
} = require('../../yoti_common');
const { messages } = require('../../proto');

function unwrapReceiptKey(wrappedReceiptKey, encryptedItemKey, itemKeyIv, pem) {
  const itemKeyIvBuffer = Buffer.from(itemKeyIv, 'base64');
  const encryptedItemKeyBuffer = Buffer.from(encryptedItemKey, 'base64');
  const wrappedReceiptKeyBuffer = Buffer.from(wrappedReceiptKey, 'base64');

  const decryptedItemKey = decryptAsymmetric(encryptedItemKeyBuffer, pem);

  const {
    cipherText: wrappedKeyCipherText,
    tag: wrappedKeyTag,
  } = decomposeAESGCMCipherText(wrappedReceiptKeyBuffer);

  return decryptAESGCM(
    wrappedKeyCipherText,
    wrappedKeyTag,
    itemKeyIvBuffer,
    decryptedItemKey
  );
}

const decryptReceiptContent = (content, receiptContentKey) => {
  if (!content) return undefined;

  const contentBuffer = Buffer.from(content, 'base64');

  const { iv, cipherText } = messages.decodeEncryptedData(contentBuffer);

  const cipherTextBuffer = Buffer.from(cipherText, 'base64');
  const ivBuffer = Buffer.from(iv, 'base64');

  return decryptAESCBC(
    cipherTextBuffer,
    ivBuffer,
    receiptContentKey
  );
};

module.exports = {
  unwrapReceiptKey,
  decryptReceiptContent,
};
