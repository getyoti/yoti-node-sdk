'use strict';

const crypto = require('crypto');
const forge = require('node-forge');

const { messages } = require('../proto');
const { AttributeListConverter } = require('./converters/attribute.list.converter');
const ExtraDataConverter = require('./converters/extra.data.converter');

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
  const privateKey = forge.pki.privateKeyFromPem(pem);

  const wrappedKeyBinary = Buffer
    .from(wrappedKey, 'base64')
    .toString('binary');

  return privateKey.decrypt(wrappedKeyBinary).toString('binary');
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
  const decodedData = messages.decodeEncryptedData(Buffer.from(encryptedData, 'base64'));

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
 * @param {string} profileContent
 * @param {string} wrappedReceiptKey
 * @param {string} pem
 *
 * @returns {{attributes: Object[]}}
 */
function decryptProfileContent(profileContent, wrappedReceiptKey, pem) {
  const profileNotEmpty = profileContent && Object.keys(profileContent).length > 0;

  if (profileNotEmpty) {
    const decryptedProfileContent = decryptEncryptedData(profileContent, wrappedReceiptKey, pem);
    const { attributes: rawAttributes } = messages.decodeAttributeList(decryptedProfileContent);
    return { attributes: AttributeListConverter.convertAttributeList(rawAttributes) };
  }
  return { attributes: [] };
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
 * @param {Object} receipt
 * @param {string} pem
 *
 * @returns {{attributes: Object[]}}
 */
module.exports.decryptUserProfile = (receipt, pem) => decryptProfileContent(
  receipt.other_party_profile_content,
  receipt.wrapped_receipt_key,
  pem
);

/**
 * @param {Object} receipt
 * @param {string} pem
 *
 * @returns {{attributes: Object[]}}
 */
module.exports.decryptApplicationProfile = (receipt, pem) => decryptProfileContent(
  receipt.profile_content,
  receipt.wrapped_receipt_key,
  pem
);

/**
 * @param {Object} receipt
 * @param {string} pem
 *
 * @returns {[]}
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
  return [];
};

/**
 * @param {Buffer} cipherText
 * @param {Buffer} tag
 * @param {Buffer} iv
 * @param {Buffer} secret
 *
 * @returns {Buffer}
 */
module.exports.decryptAESGCM = (cipherText, tag, iv, secret) => {
  const decipher = forge.cipher.createDecipher('AES-GCM', secret.toString('binary'));

  const data = forge.util.createBuffer();
  data.putBytes(cipherText.toString('binary'));

  decipher.start({
    iv: iv.toString('binary'),
    tag: tag.toString('binary'),
  });
  decipher.update(data);
  const pass = decipher.finish();

  if (pass) {
    return Buffer.from(decipher.output.getBytes(), 'binary');
  }

  throw new Error('Could not decipher');
};

/**
 * @param {Buffer} cipherText
 * @param {Buffer} iv
 * @param {Buffer} secret
 *
 * @returns {Buffer}
 */
module.exports.decryptAESCBC = (cipherText, iv, secret) => {
  const data = forge.util
    .createBuffer()
    .putBytes(cipherText.toString('binary'));

  const decipher = forge.cipher.createDecipher(
    'AES-CBC',
    secret.toString('binary')
  );

  decipher.start({ iv: iv.toString('binary') });
  decipher.update(data);
  decipher.finish();

  return Buffer.from(decipher.output.getBytes(), 'binary');
};

/**
 * @param {Buffer} cipherText
 * @param {Buffer} pem
 *
 * @returns {Buffer}
 */
module.exports.decryptAsymmetric = (cipherText, pem) => {
  const privateKey = forge.pki.privateKeyFromPem(pem);

  const cipherTextBinary = Buffer
    .from(cipherText)
    .toString('binary');

  return Buffer.from(
    privateKey.decrypt(cipherTextBinary).toString('binary'),
    'binary'
  );
};

/**
 * @param {Buffer} secret
 * @param {number} [tagSize]
 *
 * @returns {{ cipherText: Buffer, tag: Buffer }}
 */
module.exports.decomposeAESGCMCipherText = (secret, tagSize = 16) => {
  const cipherText = secret.subarray(0, secret.length - tagSize);
  const tag = secret.subarray(secret.length - tagSize);

  return {
    cipherText,
    tag,
  };
};
