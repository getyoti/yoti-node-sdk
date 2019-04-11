'use strict';

const NodeRSA = require('node-rsa');
const profileService = require('../profile_service');
const amlService = require('../aml_service');
const dynamicAttributeListService = require('../dynamic_attribute_list_service');

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
   * @desc given a dynamic attribute list request get a custom QR code denoted by the
   * dynamic attribute list stated in the request.
   * @param {*} dynamicAttributeListRequest is the request that contains the attribute list.
   * @returns {Promise} containing a dynamic attribute list
   */
  getQRCodeLink(dynamicAttributeListRequest) {
    // Build a dynamic service, that gets the service
    return dynamicAttributeListService.getDynamicAttributeList(
      dynamicAttributeListRequest,
      this.pem,
      this.applicationId
    );
  }
};
