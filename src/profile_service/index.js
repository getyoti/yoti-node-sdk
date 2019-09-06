'use strict';

const yotiRequest = require('../request');
const yotiCommon = require('../yoti_common');
const ActivityDetails = require('./activity.details').ActivityDetails;

module.exports.getReceipt = (token, pem, appId) => {
  const request = yotiRequest.buildConnectApiRequest(
    'GET',
    `/profile/${token}`,
    pem,
    appId
  );

  return new Promise((resolve, reject) => {
    request.execute()
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
