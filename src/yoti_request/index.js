'use strict'

const uuid = require('uuid');
const crypto = require('crypto');
const superagent = require('superagent');
const forge = require('node-forge');
const server = require('../../config').server;

const YotiResponse = function (parsedResponse, receipt) {
    this.parsedResponse = parsedResponse;
    this.receipt = receipt;
}

YotiResponse.prototype = {
  getReceipt : function () {
    return this.receipt;
  },

  getParsedResponse : function () {
    return this.parsedResponse;
  }
}

exports.makeRequest = (httpMethod, endpoint, pem, applicationId, payload) => {
    let authKey = getAuthKeyFromPem(pem);
    let nonce = uuid.v4();
    let timestamp =  Date.now();
    let sdkIdentifier = 'Node';
    console.log('Signing the message');
    let messageSignature = getRSASignatureForMessage(`${httpMethod}&${endpoint}?nonce=${nonce}&timestamp=${timestamp}&appId=${applicationId}&payload=${payload}`, pem);

    return new Promise((resolve, reject) => {
        console.log('Making Http method ' + httpMethod + ' request');
        superagent.get(`${server.configuration.connectApi}${endpoint}`)
        .set('X-Yoti-Auth-Key', authKey)
        .set('X-Yoti-Auth-Digest', messageSignature)
        .set('X-Yoti-SDK', sdkIdentifier)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .query({nonce: nonce})
        .query({timestamp: timestamp})
        .query({appId: applicationId})
        .query({payload: payload})
        .then(response => {
            if (response) {
                let parsedResponse = JSON.parse(response.text);
                let receipt = parsedResponse.receipt;
                console.log('Resolving the response');
                resolve(new YotiResponse(parsedResponse, receipt));
            } else {
                console.log('Error retrieving user profile');
                return reject(null)
            }
        })
        .catch(err => {
            console.error('error getting receipt from connect api: ' +  err.message);
            return reject(err)
        })
    })
}

function getRSASignatureForMessage(message, pem) {
    let sign = crypto.createSign('RSA-SHA256');
    sign.update(message);
    let base64SignedMessage = sign.sign(pem).toString('base64');
    return base64SignedMessage;
}

function getAuthKeyFromPem(pem) {
    var privateKey = forge.pki.privateKeyFromPem(pem);
    var publicKey = forge.pki.setRsaPublicKey(privateKey.n, privateKey.e);
    var subjectPublicKeyInfo = forge.pki.publicKeyToAsn1(publicKey);
    var p12Der = forge.asn1.toDer(subjectPublicKeyInfo).getBytes();
    var p12b64 = forge.util.encode64(p12Der);
    return p12b64;
}

