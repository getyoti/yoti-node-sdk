'use strict';

const NodeRSA = require('node-rsa');
const profileService = require('../profile_service');
const amlService = require('../aml_service');
const dynamicSharingService = require('../dynamic_sharing_service');

/**
 * Decrypt the provided connect token.
 *
 * @param {string} encryptedConnectToken
 * @param {string} pem
 */
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

/**
 * @class YotiClient
 */
class YotiClient {
  /**
   * @param {string} sdkId
   * @param {string} pem
   */
  constructor(sdkId, pem) {
    this.sdkId = sdkId;
    this.pem = pem;

    /** @deprecated replaced by this.sdkId */
    this.applicationId = this.sdkId;
  }

  /**
   * Get the activity details for a token. Amongst others contains the user profile with
   * the user's attributes you have selected in your application configuration.
   *
   * Note: encrypted tokens should only be used once. You should not invoke this method
   * multiple times with the same token.
   *
   * @param {string} encryptedConnectToken
   *   Encrypted Yoti token (can be only decrypted with your application's private key).
   *   Note that this token must only be used once.
   *
   * @returns {Promise} Resolving ActivityDetails instance holding the user's attributes
   */
  getActivityDetails(encryptedConnectToken) {
    let decryptedToken;
    try {
      decryptedToken = decryptToken(encryptedConnectToken, this.pem);
    } catch (err) {
      return Promise.reject(err);
    }
    return profileService.getReceipt(decryptedToken, this.pem, this.sdkId);
  }

  /**
   * Request an AML check for the given profile.
   *
   * @param amlProfile
   *   Details of the profile to search for when performing the AML check
   *
   * @returns {Promise} resolving AmlResult with the results of the check
   */
  performAmlCheck(amlProfile) {
    return amlService.performAmlCheck(amlProfile, this.pem, this.sdkId);
  }

  /**
   * Given a dynamic scenario, get a custom QR code denoted by the dynamic policy
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
      this.sdkId
    );
  }
}

module.exports = YotiClient;
