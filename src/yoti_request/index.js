'use strict'

const uuid = require('uuid');
const superagent = require('superagent');
const { server } = require('../../config');
const yotiCommon = require('../yoti_common');

let supportedMethods = ["POST", "PUT", "PATCH", "GET"];


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

exports.makeRequest = (httpMethod, endpoint, pem, applicationId, Payload) => {

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
    let payloadString = Payload.getByteArray();
    let payloadJSON = JSON.stringify(Payload.getRawData());
    let endpointPath = `${server.configuration.connectApi}${endpoint}?nonce=${nonce}&timestamp=${timestamp}&appId=${applicationId}&${payloadString}`;
    // Build message to sign
    let messageToSign = `${httpMethod}&${endpoint}?nonce=${nonce}&timestamp=${timestamp}&appId=${applicationId}&${payloadString}`;

    return new Promise((resolve, reject) => {
        // Initiate the right request
        switch(httpMethod) {
          case 'POST':
            request = superagent.post(endpointPath);
            request.send(payloadJSON);
            break;

          case 'PUT':
            request = superagent.put(endpointPath);
            request.send(payloadJSON);
            break;

          case 'PATCH':
            request = superagent.patch(endpointPath);
            request.send(payloadJSON);
            break;

          case 'DELETE':
            // Build message to sign
            messageToSign = `${httpMethod}&${endpoint}?nonce=${nonce}&timestamp=${timestamp}&appId=${applicationId}`;
            request = superagent.delete(`${server.configuration.connectApi}${endpoint}`)
                .query({nonce})
                .query({timestamp})
                .query({appId: applicationId});
            break;

          default :
            // Make default message request
            request = superagent.get(endpointPath);
        }

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
                  resolve(new YotiResponse(parsedResponse, receipt));
              } else {
                  return reject(null)
              }
          })
          .catch(err => {
              console.log('Error getting receipt from connect api: ' +  err.message);
              return reject(err)
          });
    });
}

