'use strict';

const NodeRSA = require('node-rsa');
const profileService = require('../profile_service');
const amlService = require('../aml_service');
const dynamicSharingService = require('../dynamic_sharing_service');

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
   * Given a dynamic scenario get a custom QR code denoted by the dynamic policy
   * provided in the request.
   *
   * @param {DynamicScenario} dynamicScenario - defines the wanted attribute list
   *
   * @returns {Promise} containing a ShareUrlResult
   */
  createShareUrl(dynamicScenario) {
    return dynamicSharingService.createShareUrl(
      dynamicScenario,
      this.pem,
      this.applicationId
    );
  }
};
