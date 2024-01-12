'use strict';

const config = require('../../config');
const Validation = require('../yoti_common/validation');
const { RequestBuilder } = require('../request/request.builder');
const yotiCommon = require('../yoti_common');
const ActivityDetails = require('./activity.details').ActivityDetails;

const DEFAULT_API_URL = config.yoti.connectApi;

/**
 * Service Class to handle interactions with the profile API
 *
 * @class ProfileService
 */
class ProfileService {
  /**
   * @param {string} sdkId
   * @param {string|Buffer} pem
   * @param {{apiUrl?: string}} options
   */
  constructor(sdkId, pem, { apiUrl = DEFAULT_API_URL } = {}) {
    Validation.isString(sdkId, 'sdkId');
    Validation.notNullOrEmpty(pem, 'pem');

    /** @private */
    this.sdkId = sdkId;
    /** @private */
    this.pem = pem;
    /** @private */
    this.apiUrl = apiUrl;
  }

  getReceipt(token) {
    const requestBuilder = new RequestBuilder()
      .withBaseUrl(this.apiUrl)
      .withPemString(this.pem.toString())
      .withEndpoint(`/profile/${token}`)
      .withQueryParam('appId', this.sdkId)
      .withMethod('GET');

    requestBuilder.withHeader('X-Yoti-Auth-Key', yotiCommon.getAuthKeyFromPem(this.pem.toString()));

    const request = requestBuilder.build();

    return new Promise((resolve, reject) => {
      request.execute()
        .then((response) => {
          try {
            const receipt = response.getReceipt();
            const parsedResponse = response.getParsedResponse();
            const userProfile = yotiCommon.decryptUserProfile(receipt, this.pem.toString());
            // eslint-disable-next-line max-len
            const applicationProfile = yotiCommon.decryptApplicationProfile(receipt, this.pem.toString());
            const extraData = yotiCommon.parseExtraData(receipt, this.pem.toString());
            return resolve(new ActivityDetails(
              parsedResponse,
              userProfile,
              applicationProfile,
              extraData
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
  }
}

function getReceipt(token, pem, sdkId) {
  const profileService = new ProfileService(sdkId, pem);
  return profileService.getReceipt(token);
}

module.exports = {
  getReceipt,
  ProfileService,
};
