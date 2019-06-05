'use strict';

const NodeRSA = require('node-rsa');
const crypto = require('crypto');
const forge = require('node-forge');
const protoRoot = require('../proto-root').initializeProtoBufObjects();
const Buffer = require('safe-buffer').Buffer;

// Request methods that can include payload data.
const methodsThatIncludePayload = ['POST', 'PUT', 'PATCH'];

function decipherProfile(cipherText, key, iv) {
  const decipher = forge.cipher.createDecipher('AES-CBC', key);
  const data = forge.util.createBuffer();

  data.putBytes(cipherText);

  decipher.start({ iv });
  decipher.update(data);
  decipher.finish();

  const cipherTextAsBytes = decipher.output.getBytes();

  const attributeList = protoRoot.decodeAttributeList(Buffer.from(forge.util.encode64(cipherTextAsBytes), 'base64'));
  return attributeList;
}

function unwrapKey(wrappedKey, pem) {
  const wrappedKeyBuffer = Buffer.from(wrappedKey, 'base64');
  const privateKey = new NodeRSA(pem, 'pkcs1', { encryptionScheme: 'pkcs1' });
  const unwrappedKey = privateKey.decrypt(wrappedKeyBuffer, 'base64');

  return unwrappedKey;
}

module.exports.requestCanSendPayload = (httpMethod) => {
  // Check if the request method can send payload data
  if (methodsThatIncludePayload.indexOf(httpMethod) === -1) {
    return false;
  }

  return true;
};

module.exports.getRSASignatureForMessage = (message, pem) => {
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(message);
  return sign.sign(pem).toString('base64');
};

module.exports.getAuthKeyFromPem = (pem) => {
  const privateKey = forge.pki.privateKeyFromPem(pem);
  const publicKey = forge.pki.setRsaPublicKey(privateKey.n, privateKey.e);
  const subjectPublicKeyInfo = forge.pki.publicKeyToAsn1(publicKey);
  const p12Der = forge.asn1.toDer(subjectPublicKeyInfo).getBytes();
  const p12b64 = forge.util.encode64(p12Der);
  return p12b64;
};

module.exports.decryptProfileContent = (profileContent, wrappedReceiptKey, pem) => {
  const receiptNotEmpty = profileContent && Object.keys(profileContent).length > 0;

  if (receiptNotEmpty) {
    const unwrappedKey = unwrapKey(wrappedReceiptKey, pem);
    const decodedData = protoRoot.decodeEncryptedData(Buffer.from(profileContent, 'base64'));
    const iv = forge.util.decode64(decodedData.iv);
    const cipherText = forge.util.decode64(decodedData.cipherText);

    return decipherProfile(cipherText, forge.util.decode64(unwrappedKey), iv);
  }
  console.log('Receipt data is empty');
  return [];
};

module.exports.decryptCurrentUserReceipt = (receipt, pem) => this.decryptProfileContent(
  receipt.other_party_profile_content,
  receipt.wrapped_receipt_key,
  pem
);

module.exports.decryptApplicationProfile = (receipt, pem) => this.decryptProfileContent(
  receipt.profile_content,
  receipt.wrapped_receipt_key,
  pem
);
