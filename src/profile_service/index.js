'use strict'

const yotiRequest = require('../yoti_request');
const yotiCommon = require('../yoti_common');
const Payload = require('../yoti_request/payload').Payload;

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

const PayloadObj = new Payload('');

exports.getReceipt = (token, pem, appId) => {
  let endpoint = `/profile/${token}`;
  let httpMethod = 'GET';

  return new Promise((resolve, reject) => {
    yotiRequest.makeRequest(httpMethod, endpoint, pem, appId, PayloadObj)
        .then(response => {
          if (response) {
            let receipt = response.getReceipt();
            let parsedResponse = response.getParsedResponse();
            let decryptedProfile = yotiCommon.decryptCurrentUserReceipt(receipt, pem);
            return resolve(new ActivityDetails(parsedResponse, decryptedProfile));
          }
          console.log('Error getting response data');
          return reject(null);
        }).catch((err) => {
          console.log('Error retrieving request data : ' + err.message);
          return reject(err);
        });
  });
}
