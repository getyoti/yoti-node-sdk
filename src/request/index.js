'use strict';

const config = require('../../config');

const { SignedRequest } = require('./signed.request');

/**
 * Make a signed request.
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
  const signedRequest = new SignedRequest(config.yoti.connectApi, pem);
  return signedRequest.sendRequest(endpoint, httpMethod, payload, { appId });
};
