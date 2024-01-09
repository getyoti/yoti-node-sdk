'use strict';

const forge = require('node-forge');
const { AmlService } = require('../aml_service');
const { DynamicShareService } = require('../dynamic_sharing_service');
const { ProfileService } = require('../profile_service');
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
   * @param {{apiUrl?: string}} options
   */
  constructor(sdkId, pem, { apiUrl } = {}) {
    /** @private */
    this.sdkId = sdkId;
    /** @private */
    this.pem = pem;

    const options = {
      apiUrl: apiUrl || config.yoti.connectApi,
    };

    /** @private */
    this.amlService = new AmlService(sdkId, pem, options);
    /** @private */
    this.profileService = new ProfileService(sdkId, pem, options);
    /** @private */
    this.dynamicShareService = new DynamicShareService(sdkId, pem, options);

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
      decryptedToken = decryptToken(encryptedConnectToken, this.pem.toString());
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
   * @typedef {import('./../dynamic_sharing_service/dynamic.scenario')} DynamicScenario
   * @typedef {import('./../dynamic_sharing_service/share.url.result')} ShareUrlResult
   *
   * @param {DynamicScenario} dynamicScenario - defines the wanted attribute list
   *
   * @returns {Promise<ShareUrlResult>}
   */
  createShareUrl(dynamicScenario) {
    return this.dynamicShareService.createShareUrl(dynamicScenario);
  }
}

module.exports = YotiClient;
