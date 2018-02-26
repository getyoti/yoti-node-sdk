'use strict'

const ursa = require('ursa');
const uuid = require('uuid');
const crypto = require('crypto');
const superagent = require('superagent');
const forge = require('node-forge');
const server = require('../../config').server;
const protoRoot = require('../proto-root').initializeProtoBufObjects();

const ActivityDetails = function (parsedResponse, decryptedProfile) {

    this.parsedResponse = parsedResponse;
    this.decryptedProfile = decryptedProfile;

    this.receipt = parsedResponse.receipt;
    this.profile = decryptedProfile || [];
    this.profile = this.profile.reduce((acc, current) => {
        let propName = Object.getOwnPropertyNames(current)[0]
        acc[propName] = current[propName]
        return acc
    }, {})

}

ActivityDetails.prototype = {
  getUserId : function() {
    return this.receipt.remember_me_id;
  },

  getUserProfile : function() {
    return this.profile;
  },

  getOutcome : function() {
    return this.receipt.sharing_outcome;
  }
}

const YotiResponse = function (parsedResponse, receipt) {
    this.parsedResponse = parsedResponse;
    this.receipt = receipt;
}

YotiResponse.prototype = {
    getReceipt : function() {
        return this.receipt;
    },

    getParsedResponse : function() {
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
                let decryptedProfile = decryptCurrentUserReceipt(receipt, pem);
                console.log('Resolving the response');
                //resolve(new YotiResponse(parsedResponse, receipt));
                resolve(new ActivityDetails(parsedResponse, decryptedProfile));
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

function decryptCurrentUserReceipt(receipt, pem, callback) {
    if(receipt.other_party_profile_content && Object.keys(receipt.other_party_profile_content).length > 0) {
        let unwrappedKey = unwrapKey(receipt.wrapped_receipt_key, pem);
        let decodedData = protoRoot.decodeEncryptedData(new Buffer(receipt.other_party_profile_content, 'base64'))
        let iv = forge.util.decode64(decodedData.iv);
        let cipherText = forge.util.decode64(decodedData.cipherText);

        return decipherProfile(cipherText, forge.util.decode64(unwrappedKey), iv);
    } else {
        console.log('no decrypted data')
        return []
    }
}

function decipherProfile(cipherText, key, iv, callback) {
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

function unwrapKey(wrappedKey, pem) {
    let wrappedKeyBuffer = new Buffer(wrappedKey, 'base64');
    let privateKey = ursa.createPrivateKey(pem);
    let unwrappedKey = privateKey.decrypt(wrappedKeyBuffer, 'base64', 'base64', ursa.RSA_PKCS1_PADDING);

    return unwrappedKey
}

