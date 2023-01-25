'use strict';

const forge = require('node-forge');
const { AmlService } = require('../aml_service');
const { DynamicShareService } = require('../dynamic_sharing_service');
const { ProfileService } = require('../profile_service');
const { ShareService } = require('../share_service');
const config = require('../../config');

/**
 * Decrypt the provided connect token.
 *
 * @param {string} encryptedConnectToken
 * @param {string} pem
 */
function decryptToken(encryptedConnectToken, pem) {
  const privateKey = forge.pki.privateKeyFromPem(pem);

  try {
    const encryptedConnectTokenBinary = Buffer
      .from(encryptedConnectToken, 'base64')
      .toString('binary');
    return privateKey.decrypt(encryptedConnectTokenBinary);
  } catch (e) {
    throw new Error(`Could not decrypt token: ${encryptedConnectToken}`);
  }
}

/**
 * @class YotiClient
 */
class YotiClient {
  /**
   * @param {string} sdkId
   * @param {string} pem
   * @param {Object} options
   * @param {string} options.apiUrl
   */
  constructor(sdkId, pem, { apiUrl } = {}) {
    this.sdkId = sdkId;
    this.pem = pem;

    const options = {
      apiUrl: apiUrl || config.yoti.connectApi,
    };

    this.amlService = new AmlService(sdkId, pem, options);
    this.profileService = new ProfileService(sdkId, pem, options);
    this.dynamicShareService = new DynamicShareService(sdkId, pem, options);
    this.shareService = new ShareService(sdkId, pem, {
      // apiUrl: 'http://localhost:8060',
      apiUrl,
    });

    /** @deprecated replaced by this.sdkId */
    // this.applicationId = this.sdkId;
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
    return this.profileService.getReceipt(decryptedToken);
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
    return this.amlService.performAmlCheck(amlProfile);
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
    return this.dynamicShareService.createShareUrl(dynamicScenario);
  }

  createShareSession(dynamicScenario) {
    return this.shareService.createSession(dynamicScenario);
  }

  createShareQrCode(sessionId) {
    return this.shareService.createQrCode(sessionId);
  }

  fetchShareSession(sessionId) {
    return this.shareService.fetchSession(sessionId);
  }
}

module.exports = YotiClient;
