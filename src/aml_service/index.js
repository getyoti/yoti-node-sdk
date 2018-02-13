'use strict'

const yotiRequest = require('../yoti_request');
const RequestPayload = require('../request_payload');
const AmlResult = require('../yoti_request/aml.result').AmlResult;

exports.performAmlCheck = (amlProfile, pem, appId) => {
  let endpoint = `/aml-check`;
  let httpMethod = 'POST';

  if (!amlProfile) {
    throw new Error('Error - amlProfile should be an object of type AmlProfile');
  }

  let Payload = new RequestPayload.Payload(amlProfile.getData());

  return new Promise((resolve, reject) => {
    yotiRequest.makeRequest(httpMethod, endpoint, pem, appId, Payload)
        .then(response => {
          if (response) {
            // This will throw an error if the error message is included in the response.
            AmlResult.checkAmlError(response.getParsedResponse());
            return resolve(new AmlResult(response.getParsedResponse()));
          }
          console.log('Error getting response data');
          return reject(null);
        }).catch((err) => {
        console.log('Error retrieving request data : ' + err.message);
        return reject(err);
    });
  });
}