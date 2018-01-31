'use strict'

const uuid = require('uuid');
const superagent = require('superagent');
const server = require('../../config').server;
const yotiCommon = require('../yoti_common');
const RequestPayload = require('../request_payload');


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

let Payload = RequestPayload.Payload;

exports.makeRequest = (httpMethod, endpoint, pem, applicationId, Payload) => {
    let authKey = yotiCommon.getAuthKeyFromPem(pem);
    let nonce = uuid.v4();
    let timestamp =  Date.now();
    let sdkIdentifier = 'Node';
    let messageToSign;
    let request;
    let payloadString = Payload.getByteArray();
    let payloadJSON = JSON.stringify(Payload.getRawData());
    let endpointPath = `${server.configuration.connectApi}${endpoint}?nonce=${nonce}&timestamp=${timestamp}&appId=${applicationId}&${payloadString}`;


    console.log('Signing the request message');
    console.log('Payload ' + payloadString);

    return new Promise((resolve, reject) => {
        console.log('Making Http method ' + httpMethod + ' request');
        // Initiate the right request
        switch(httpMethod) {
          case 'POST', 'PUT', 'PATCH':
            // Build message to sign
            messageToSign = `${httpMethod}&${endpoint}?nonce=${nonce}&timestamp=${timestamp}&appId=${applicationId}&${payloadString}`;
            // Get the right request method
            if(httpMethod === 'POST') {
              request = superagent.post(endpointPath);
            }
            else if (httpMethod === 'PUT') {
              request = superagent.put(endpointPath);
            } else {
              request = superagent.patch(endpointPath);
            }

            request.send(payloadJSON);
            break;

          case 'DELETE':
            // Build message to sign
            messageToSign = `${httpMethod}&${endpoint}?nonce=${nonce}&timestamp=${timestamp}&appId=${applicationId}`;
            request = superagent.delete(`${server.configuration.connectApi}${endpoint}`)
                .query({nonce: nonce})
                .query({timestamp: timestamp})
                .query({appId: applicationId});


          default :
            // Make default message request
            // Build message to sign
            messageToSign = `${httpMethod}&${endpoint}?nonce=${nonce}&timestamp=${timestamp}&appId=${applicationId}&${payloadString}`;
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
                  console.log('Processing the request response');
                  resolve(new YotiResponse(parsedResponse, receipt));
              } else {
                  console.log('error retrieving user profile');
                  return reject(null)
              }
          })
          .catch(err => {
              console.log('error getting receipt from connect api: ' +  err.message);
              return reject(err)
          });
    });
}

