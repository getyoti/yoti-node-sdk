'use strict';

const config = require('../../config');

const { RequestBuilder } = require('./request.builder');

/**
 * Builds a Connect API request object.
 *
 * @param {string} pem
 *
 * @returns {SignedRequest}
 */
module.exports.buildConnectApiRequest = pem => new RequestBuilder()
  .withBaseUrl(config.yoti.connectApi)
  .withPemString(pem)
  .build();

/**
 * Make a signed request.
 *
 * @deprecated will be removed in version 4 - use buildConnectApiRequest()
 *
 * @param {string} httpMethod
 * @param {string} endpoint
 * @param {string} pem
 * @param {string} appId
 * @param {Payload} payload
 *
 * @returns {Promise}
 */
module.exports.makeRequest = (httpMethod, endpoint, pem, appId, payload) => {
  const connectApi = this.buildConnectApiRequest(pem);
  return connectApi.sendRequest(endpoint, httpMethod, payload, { appId });
};
