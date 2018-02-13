'use strict'

const yotiRequest = require('../yoti_request');
const AmlResult = require('../yoti_request/aml.result').AmlResult;
const Payload = require('../yoti_request/payload').Payload;

exports.performAmlCheck = (amlProfile, pem, appId) => {
  let endpoint = '/aml-check';
  let httpMethod = 'POST';

  if (!amlProfile) {
    throw new Error('Error - AmlProfile should be an object of type Entity/AmlProfile');
  }

  let PayloadObj = new Payload(amlProfile.getData());

  return new Promise((resolve, reject) => {
    yotiRequest.makeRequest(httpMethod, endpoint, pem, appId, PayloadObj)
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