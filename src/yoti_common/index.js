'use strict'

const ursa = require('ursa');
const crypto = require('crypto');
const forge = require('node-forge');
const protoRoot = require('../proto-root').initializeProtoBufObjects();

// Request methods that can include payload data.
let methodsThatIncludePayload = ['POST', 'PUT', 'PATCH'];

function decipherProfile(cipherText, key, iv){
  let decipher = forge.cipher.createDecipher('AES-CBC', key),
      data = forge.util.createBuffer()

  data.putBytes(cipherText)

  decipher.start({iv: iv})
  decipher.update(data)
  decipher.finish()

  let cipherTextAsBytes = decipher.output.getBytes();

  let attributeList = protoRoot.decodeAttributeList(new Buffer(forge.util.encode64(cipherTextAsBytes), 'base64'))
  return attributeList;
}

function unwrapKey(wrappedKey, pem){
  let wrappedKeyBuffer = new Buffer(wrappedKey, 'base64');
  let privateKey = ursa.createPrivateKey(pem);
  let unwrappedKey = privateKey.decrypt(wrappedKeyBuffer, 'base64', 'base64', ursa.RSA_PKCS1_PADDING);

  return unwrappedKey
}

exports.requestCanSendPayload = (httpMethod) => {
  // Check if the request method can send payload data
  if(methodsThatIncludePayload.indexOf(httpMethod) === -1) {
    return false;
  }

  return true;
}

exports.getRSASignatureForMessage = (message, pem) => {
  let sign = crypto.createSign('RSA-SHA256');
  sign.update(message);
  return sign.sign(pem).toString('base64');
}

exports.getAuthKeyFromPem = (pem) => {
  let privateKey = forge.pki.privateKeyFromPem(pem);
  let publicKey = forge.pki.setRsaPublicKey(privateKey.n, privateKey.e);
  let subjectPublicKeyInfo = forge.pki.publicKeyToAsn1(publicKey);
  let p12Der = forge.asn1.toDer(subjectPublicKeyInfo).getBytes();
  let p12b64 = forge.util.encode64(p12Der);
  return p12b64;
}

exports.decryptCurrentUserReceipt = (receipt, pem) => {
  if(receipt.other_party_profile_content && Object.keys(receipt.other_party_profile_content).length > 0) {
    let unwrappedKey = unwrapKey(receipt.wrapped_receipt_key, pem);
    let decodedData = protoRoot.decodeEncryptedData(new Buffer(receipt.other_party_profile_content, 'base64'))
    let iv = forge.util.decode64(decodedData.iv);
    let cipherText = forge.util.decode64(decodedData.cipherText);

    return decipherProfile(cipherText, forge.util.decode64(unwrappedKey), iv);
  }
  console.log('Receipt data is empty');
  return [];
}