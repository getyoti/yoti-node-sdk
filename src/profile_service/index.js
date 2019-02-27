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
  /**
   * Return the Remember Me ID, which is a unique, stable identifier for
   * a user in the context of an application.
   *
   * You can use it to identify returning users. This value will be different
   * for the same user in different applications.
   *
   * @returns {string}
   */
  getRememberMeId() { return this.receipt.remember_me_id; },

  /**
   * Return the Parent Remember Me ID, which is a unique, stable identifier for a
   * user in the context of an organisation.
   *
   * You can use it to identify returning users. This value is consistent for a
   * given user across different applications belonging to a single organisation.
   *
   * @returns {string}
   */
  getParentRememberMeId() { return this.receipt.parent_remember_me_id; },

  /**
   * The user profile returned by Yoti if the request was successful.
   *
   * @returns {Object}
   */
  getUserProfile() { return this.profile; },

  /**
   * The user Profile object.
   *
   * @returns {Profile}
   */
  getProfile() { return this.extendedProfile; },

  /**
   * A enum to represent the success state when requesting a profile.
   *
   * @returns {string}
   */
  getOutcome() { return this.receipt.sharing_outcome; },

  /**
   * Base64 encoded selfie image.
   *
   * @returns {string}
   */
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
