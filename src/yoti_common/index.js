'use strict'

const crypto = require('crypto');
const forge = require('node-forge');

exports.getRSASignatureForMessage = (message, pem) => {
  let sign = crypto.createSign('RSA-SHA256');
  sign.update(message);
  let base64SignedMessage = sign.sign(pem).toString('base64');
  return base64SignedMessage;
}

exports.getAuthKeyFromPem = (pem) => {
  let privateKey = forge.pki.privateKeyFromPem(pem);
  let publicKey = forge.pki.setRsaPublicKey(privateKey.n, privateKey.e);
  let subjectPublicKeyInfo = forge.pki.publicKeyToAsn1(publicKey);
  let p12Der = forge.asn1.toDer(subjectPublicKeyInfo).getBytes();
  let p12b64 = forge.util.encode64(p12Der);
  return p12b64;
}