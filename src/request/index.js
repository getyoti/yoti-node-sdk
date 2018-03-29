'use strict';

const uuid = require('uuid');
const superagent = require('superagent');
const config = require('../../config');
const yotiCommon = require('../yoti_common');

const supportedMethods = ['POST', 'PUT', 'PATCH', 'GET', 'DELETE'];

const YotiResponse = function main(parsedResponse, receipt) {
  this.parsedResponse = parsedResponse;
  this.receipt = receipt;
};

YotiResponse.prototype = {
  getReceipt() { return this.receipt; },
  getParsedResponse() { return this.parsedResponse; },
};

module.exports.makeRequest = (httpMethod, endpoint, pem, appId, Payload) => {
  // Make sure payload is an object
  if (!Payload) {
    throw new Error('Payload should be an object of type Request/Payload');
  }

  // Check if request method is supported
  if (supportedMethods.indexOf(httpMethod) === -1) {
    throw new Error(`HTTP method ${httpMethod} is not supported`);
  }

  const authKey = yotiCommon.getAuthKeyFromPem(pem);
  const nonce = uuid.v4();
  const timestamp = Date.now();
  const sdkIdentifier = 'Node';
  let request;
  const payloadJSON = Payload.getPayloadJSON();
  let payloadBase64 = '';
  const endpointPath = `${config.yoti.connectApi}${endpoint}?nonce=${nonce}&timestamp=${timestamp}&appId=${appId}`;

  return new Promise((resolve, reject) => {
    request = superagent(httpMethod, endpointPath);

    // Check if this method can include payload data in the request body
    // and in the signed message.
    if (yotiCommon.requestCanSendPayload(httpMethod)) {
      payloadBase64 = `&${Payload.getBase64Payload()}`;
      request.send(payloadJSON);
    }

    // Build message to sign
    const messageToSign = `${httpMethod}&${endpoint}?nonce=${nonce}&timestamp=${timestamp}&appId=${appId}${payloadBase64}`;
    const messageSignature = yotiCommon.getRSASignatureForMessage(messageToSign, pem);

    request.set('X-Yoti-Auth-Key', authKey)
      .set('X-Yoti-Auth-Digest', messageSignature)
      .set('X-Yoti-SDK', sdkIdentifier)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .then((response) => {
        try {
          const parsedResponse = JSON.parse(response.text);
          const receipt = parsedResponse.receipt;
          return resolve(new YotiResponse(parsedResponse, receipt));
        } catch (err) {
          return reject(err);
        }
      })
      .catch((err) => {
        console.log(`Error getting data from Connect API: ${err.message}`);
        return reject(err);
      });
  });
};
