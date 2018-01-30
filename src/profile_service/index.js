'use strict'

const yotiRequest = require('../yoti_request');
const RequestPayload = require('../request_payload');
const ursa = require('ursa');
const forge = require('node-forge');
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
		 }, {});
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

const Payload = new RequestPayload.Payload('');

exports.getReceipt = (token, pem, applicationId) => {
  let endpoint = `/profile/${token}`;
  let httpMethod = 'GET';

  return new Promise((resolve, reject) => {
    yotiRequest.makeRequest(httpMethod, endpoint, pem, applicationId, Payload)
        .then(response => {
          if(response) {
            let receipt = response.getReceipt();
            let parsedResponse = response.getParsedResponse();
            let decryptedProfile = decryptCurrentUserReceipt(receipt, pem);
            return resolve(new ActivityDetails(parsedResponse, decryptedProfile));
          }
          else {
            console.log('error getting response data');
            return reject(null);
          }
        }).catch((err) => {
          console.log('error retrieving request data : ' + err.message);
          return reject(err);
        });
  });
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
