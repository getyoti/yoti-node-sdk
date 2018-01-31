'use strict'

const yotiRequest = require('../yoti_request');
const RequestPayload = require('../request_payload');
const yotiCommon = require('../yoti_common');

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
            let decryptedProfile = yotiCommon.decryptCurrentUserReceipt(receipt, pem);
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
