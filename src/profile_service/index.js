'use strict';

const httpRequest = require('../request');
const yotiCommon = require('../yoti_common');
const Age = require('../yoti_common/age').Age;
const Payload = require('../request/payload').Payload;
const Profile = require('./profile').Profile;

const ActivityDetails = function main(parsedResponse, decryptedProfile) {
  this.parsedResponse = parsedResponse;
  this.decryptedProfile = decryptedProfile;

  this.receipt = parsedResponse.receipt;
  this.profile = decryptedProfile || [];

  this.profile = this.profile.reduce((acc, current) => {
    const propName = Object.getOwnPropertyNames(current)[0];
    acc[propName] = current[propName];
    return acc;
  }, {});

  // This is the new profile attribute
  this.extendedProfile = new Profile(this.profile.extendedProfile);
  delete this.profile.extendedProfile;

  const age = new Age(this.profile);
  if (age.isVerified() !== null) {
    this.profile.isAgeVerified = age.isVerified();
  }
};

ActivityDetails.prototype = {
  getUserId() { return this.receipt.remember_me_id; },
  getParentRememberMeId() { return this.receipt.parent_remember_me_id; },
  getUserProfile() { return this.profile; },
  getProfile() { return this.extendedProfile; }, // This is the new profile object
  getOutcome() { return this.receipt.sharing_outcome; },
  getBase64SelfieUri() { return this.profile.base64SelfieUri; },
};

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
          return resolve(new ActivityDetails(parsedResponse, decryptedProfile));
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
