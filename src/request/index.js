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
module.exports.buildConnectApiRequest = (
  httpMethod,
  endpoint,
  pem,
  sdkId,
  payload,
  headers
) => {
  const requestBuilder = new RequestBuilder()
    .withBaseUrl(config.yoti.connectApi)
    .withPemString(pem)
    .withEndpoint(endpoint)
    .withQueryParam('appId', sdkId)
    .withMethod(httpMethod);

  if (headers) {
    Object.keys(headers).forEach((name) => requestBuilder.withHeader(name, headers[name]));
  }

  if (payload) {
    requestBuilder.withPayload(payload);
  }

  return requestBuilder.build();
};

/**
 * Make a signed request.
 *
 * @deprecated will be removed in version 4 - use buildConnectApiRequest()
 *
 * @param {string} httpMethod
 * @param {string} endpoint
 * @param {string} pem
 * @param {string} sdkId
 * @param {Payload} payload
 *
 * @returns {Promise}
 */
module.exports.makeRequest = (
  httpMethod,
  endpoint,
  pem,
  sdkId,
  payload
) => this.buildConnectApiRequest(
  httpMethod,
  endpoint,
  pem,
  sdkId,
  payload
).execute();
