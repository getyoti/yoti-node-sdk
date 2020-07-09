'use strict';

const NodeRSA = require('node-rsa');
const crypto = require('crypto');
const forge = require('node-forge');
const Buffer = require('safe-buffer').Buffer;

const protoRoot = require('../proto-root').initializeProtoBufObjects();

const ExtraData = require('../profile_service/extra.data');
const ExtraDataConverter = require('./extra.data.converter');

// Request methods that can include payload data.
const methodsThatIncludePayload = ['POST', 'PUT', 'PATCH'];

/**
 * Decrypt wrapped key using provided pem key.
 *
 * @param {string} wrappedKey
 * @param {string} pem
 *
 * @returns {string}
 */
function unwrapKey(wrappedKey, pem) {
  const wrappedKeyBuffer = Buffer.from(wrappedKey, 'base64');
  const privateKey = new NodeRSA(pem, 'pkcs1', { encryptionScheme: 'pkcs1' });
  const unwrappedKey = privateKey.decrypt(wrappedKeyBuffer, 'base64');
  return forge.util.decode64(unwrappedKey);
}

/**
 * Decrypt encrypted data using provided wrapped key.
 *
 * @param {string} encryptedData
 * @param {string} wrappedReceiptKey
 * @param {string} pem
 *
 * @returns {Buffer}
 */
function decryptEncryptedData(encryptedData, wrappedReceiptKey, pem) {
  const decodedData = protoRoot.decodeEncryptedData(Buffer.from(encryptedData, 'base64'));

  const iv = forge.util.decode64(decodedData.iv);
  const cipherText = forge.util.decode64(decodedData.cipherText);

  const data = forge.util
    .createBuffer()
    .putBytes(cipherText);

  const decipher = forge.cipher
    .createDecipher(
      'AES-CBC',
      unwrapKey(wrappedReceiptKey, pem)
    );

  decipher.start({ iv });
  decipher.update(data);
  decipher.finish();

  return Buffer.from(decipher.output.getBytes(), 'binary');
}

/**
 * @param {string} httpMethod
 *
 * @returns {boolean}
 */
module.exports.requestCanSendPayload = (httpMethod) => {
  // Check if the request method can send payload data
  if (methodsThatIncludePayload.indexOf(httpMethod) === -1) {
    return false;
  }

  return true;
};

/**
 * @param {string} message
 * @param {string} pem
 *
 * @returns {string}
 */
module.exports.getRSASignatureForMessage = (message, pem) => crypto
  .createSign('RSA-SHA256')
  .update(message)
  .sign(pem)
  .toString('base64');

/**
 * @param {string} pem
 *
 * @returns {string}
 */
module.exports.getAuthKeyFromPem = (pem) => {
  const privateKey = forge.pki.privateKeyFromPem(pem);
  const publicKey = forge.pki.setRsaPublicKey(privateKey.n, privateKey.e);
  const subjectPublicKeyInfo = forge.pki.publicKeyToAsn1(publicKey);
  const p12Der = forge.asn1.toDer(subjectPublicKeyInfo).getBytes();
  const p12b64 = forge.util.encode64(p12Der);
  return p12b64;
};

/**
 * @param {string} profileContent
 * @param {string} wrappedReceiptKey
 * @param {string} pem
 *
 * @returns {Object[]}
 */
module.exports.decryptProfileContent = (profileContent, wrappedReceiptKey, pem) => {
  const receiptNotEmpty = profileContent && Object.keys(profileContent).length > 0;

  if (receiptNotEmpty) {
    const decryptedProfileData = decryptEncryptedData(profileContent, wrappedReceiptKey, pem);
    return protoRoot.decodeAttributeList(decryptedProfileData);
  }
  console.log('Receipt data is empty');
  return [];
};

/**
 * @param {Object} receipt
 * @param {string} pem
 *
 * @returns {Object[]}
 */
module.exports.decryptCurrentUserReceipt = (receipt, pem) => this.decryptProfileContent(
  receipt.other_party_profile_content,
  receipt.wrapped_receipt_key,
  pem
);

/**
 * @param {Object} receipt
 * @param {string} pem
 *
 * @returns {Object[]}
 */
module.exports.decryptApplicationProfile = (receipt, pem) => this.decryptProfileContent(
  receipt.profile_content,
  receipt.wrapped_receipt_key,
  pem
);

/**
 * @param {Object} receipt
 * @param {string} pem
 *
 * @returns {ExtraData}
 */
module.exports.parseExtraData = (receipt, pem) => {
  const extraDataNotEmpty = receipt.extra_data_content
    && Object.keys(receipt.extra_data_content).length > 0;

  if (extraDataNotEmpty) {
    const decryptedExtraData = decryptEncryptedData(
      receipt.extra_data_content,
      receipt.wrapped_receipt_key,
      pem
    );

    return ExtraDataConverter.convertExtraData(decryptedExtraData);
  }

  return new ExtraData(undefined);
};
