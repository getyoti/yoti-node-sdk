'use strict';

const httpRequest = require('../request');
const yotiCommon = require('../yoti_common');
const Payload = require('../request/payload').Payload;
const ActivityDetails = require('./activity.details').ActivityDetails;

const payload = new Payload('');

module.exports.getReceipt = (token, pem, appId) => {
  const endpoint = `/profile/${token}`;
  const httpMethod = 'GET';

  return new Promise((resolve, reject) => {
    httpRequest.makeRequest(httpMethod, endpoint, pem, appId, payload)
      .then((response) => {
        try {
          const receipt = response.getReceipt();
          const parsedResponse = response.getParsedResponse();
          const decryptedProfile = yotiCommon.decryptCurrentUserReceipt(receipt, pem);
          const decryptedApplicationProfile = yotiCommon.decryptApplicationProfile(receipt, pem);
          return resolve(new ActivityDetails(
            parsedResponse,
            decryptedProfile,
            decryptedApplicationProfile
          ));
        } catch (err) {
          console.log(`Error getting response data: ${err.message}`);
          return reject(err);
        }
      }).catch((err) => {
        console.log(`Error retrieving request data : ${err.message}`);
        return reject(err);
      });
  });
};
