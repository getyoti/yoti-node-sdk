'use strict'

const YotiRequest = require('../yoti_request');
const AmlResult = require('../yoti_request/aml.result').AmlResult;
const RequestPayload = require('../yoti_request/payload');

exports.performAmlCheck = (amlProfile, pem, appId) => {
  let endpoint = `/aml-check`;
  let httpMethod = 'POST';

  if (!amlProfile) {
    throw new Error('Error - amlProfile should be an object of type AmlProfile');
  }

  let PayloadObj = new RequestPayload.Payload(amlProfile.getData());

  return new Promise((resolve, reject) => {
    YotiRequest.makeRequest(httpMethod, endpoint, pem, appId, PayloadObj)
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