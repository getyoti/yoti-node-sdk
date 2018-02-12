'use strict'

const uuid = require('uuid');
const superagent = require('superagent');
const server = require('../../config').server;
const yotiCommon = require('../yoti_common');

let supportedMethods = ["POST", "PUT", "PATCH", "GET", "DELETE"];


const YotiResponse = function (parsedResponse, receipt) {
    this.parsedResponse = parsedResponse;
    this.receipt = receipt;
}

YotiResponse.prototype = {
  getReceipt : function () {
    return this.receipt;
  },

  getParsedResponse : function () {
    return this.parsedResponse;
  }
}

exports.makeRequest = (httpMethod, endpoint, pem, appId, Payload) => {

    // Make sure Payload is an object
    if(!Payload) {
      throw new Error('Payload should be an object of type RequestPayload');
    }

    // Check if request method is supported
    if(supportedMethods.indexOf(httpMethod) === -1) {
      throw new Error('Http method ' + httpMethod + ' is not supported');
    }

    let authKey = yotiCommon.getAuthKeyFromPem(pem);
    let nonce = uuid.v4();
    let timestamp =  Date.now();
    let sdkIdentifier = 'Node';
    let request;
    let payloadJSON = Payload.getPayloadJSON();
    let payloadBase64 = '';
    let endpointPath = `${server.configuration.connectApi}${endpoint}?nonce=${nonce}&timestamp=${timestamp}&appId=${appId}`;

    return new Promise((resolve, reject) => {
        switch(httpMethod) {
          case 'POST':
          case 'PUT':
          case 'PATCH':
            payloadBase64 = `&${Payload.getBase64Payload()}`;
            request = superagent(httpMethod, endpointPath);
            request.send(payloadJSON);
            break;

          default :
            request = superagent(httpMethod, endpointPath);
        }

        // Build message to sign
        let messageToSign = `${httpMethod}&${endpoint}?nonce=${nonce}&timestamp=${timestamp}&appId=${appId}${payloadBase64}`;
        let messageSignature = yotiCommon.getRSASignatureForMessage(messageToSign, pem);

        request.set('X-Yoti-Auth-Key', authKey)
          .set('X-Yoti-Auth-Digest', messageSignature)
          .set('X-Yoti-SDK', sdkIdentifier)
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .then(response => {
              if (response) {
                  let parsedResponse = JSON.parse(response.text);
                  let receipt = parsedResponse.receipt;
                  return resolve(new YotiResponse(parsedResponse, receipt));
              }
              return reject(null);
          })
          .catch((err) => {
              console.log('Error getting data from connect api: ' +  err.message);
              return reject(err)
          });
    });
}

