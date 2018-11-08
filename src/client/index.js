'use strict';

const NodeRSA = require('node-rsa');
const profileService = require('../profile_service');
const amlService = require('../aml_service');
const dynamicPolicyService = require('../dynamic_policy_service');

function decryptToken(encryptedConnectToken, pem) {
  const privateKey = new NodeRSA(pem, 'pkcs1', { encryptionScheme: 'pkcs1' });
  let decryptedToken;
  try {
    decryptedToken = privateKey.decrypt(encryptedConnectToken, 'utf8');
  } catch (err) {
    throw new Error(`Could not decrypt token: ${encryptedConnectToken}`);
  }
  return decryptedToken;
}

module.exports.YotiClient = class YotiClient {
  constructor(applicationId, pem) {
    this.applicationId = applicationId;
    this.pem = pem;
  }

  getActivityDetails(encryptedConnectToken) {
    let decryptedToken;
    try {
      decryptedToken = decryptToken(encryptedConnectToken, this.pem);
    } catch (err) {
      return Promise.reject(err);
    }
    return profileService.getReceipt(decryptedToken, this.pem, this.applicationId);
  }

  performAmlCheck(amlProfile) {
    return amlService.performAmlCheck(amlProfile, this.pem, this.applicationId);
  }

  /**
   * @desc given a dynamic sharing request get a custom qr code denoted by the
   * policy stated in the request.
   * @param {*} dynamicSharingRequest is the request that contains the policy.
   * @returns {Promise} constaining a dynamic
   */
  getDynamicPolicyQRCodeLink(dynamicPolicyRequest) {
    // Build a dynbanic service, that gets the service
    return dynamicPolicyService.getDynamicPolicy(
      dynamicPolicyRequest,
      this.pem,
      this.applicationId,
    );
  }
};
