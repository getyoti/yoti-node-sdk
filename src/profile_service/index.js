'use strict'

const httpRequest = require('../request');
const yotiCommon = require('../yoti_common');
const {Payload} = require('../request/payload');

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

const payload = new Payload('');

exports.getReceipt = (token, pem, appId) => {
  let endpoint = `/profile/${token}`;
  let httpMethod = 'GET';

  return new Promise((resolve, reject) => {
    httpRequest.makeRequest(httpMethod, endpoint, pem, appId, payload)
        .then(response => {
          try {
            let receipt = response.getReceipt();
            let parsedResponse = response.getParsedResponse();
            let decryptedProfile = yotiCommon.decryptCurrentUserReceipt(receipt, pem);
            return resolve(new ActivityDetails(parsedResponse, decryptedProfile));
          }
          catch (err) {
            console.log('Error getting response data: ' + err.message);
            return reject(err);
          }
        }).catch((err) => {
          console.log('Error retrieving request data : ' + err.message);
          return reject(err);
        });
  });
}
