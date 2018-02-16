'use strict'

const httpRequest = require('../request');
const AmlResultClass = require('../request/aml.result').AmlResult;
const {Payload} = require('../request/payload');
const constants = require('../yoti_common/constants');

const AmlResult = function(rawResult){
  this.isOnPepList = rawResult[constants.ON_PEP_LIST_ATTR];
  this.isOnFraudList = rawResult[constants.ON_FRAUD_LIST_ATTR];
  this.isOnWatchList = rawResult[constants.ON_WATCH_LIST_ATTR];
}

AmlResult.prototype = {
  /**
   * Get result data.
   *
   * @returns {{}}
   */
  getData () {
    let data = {};
    data[constants.ON_PEP_LIST_ATTR] = this.isOnPepList;
    data[constants.ON_FRAUD_LIST_ATTR] = this.isOnFraudList;
    data[constants.ON_WATCH_LIST_ATTR] = this.isOnWatchList;

    return data;
  },

  toString () {
    return JSON.stringify(this.getData());
  }
}

exports.performAmlCheck = (amlProfile, pem, appId) => {
  let endpoint = '/aml-check';
  let httpMethod = 'POST';

  if (!amlProfile) {
    throw new Error('Error - AmlProfile should be an object of type Type/AmlProfile');
  }

  let payload = new Payload(amlProfile.getData());

  return new Promise((resolve, reject) => {
    httpRequest.makeRequest(httpMethod, endpoint, pem, appId, payload)
        .then(response => {
          try {
            let parsedResponse = response.getParsedResponse();
            // This will throw an error if the error message is included in the response.
            AmlResultClass.checkAmlError(parsedResponse);
            AmlResultClass.checkAttributes(parsedResponse);
            return resolve(new AmlResult(parsedResponse));
          } catch (err) {
            console.log('Error getting response data : ' + err.message);
            return reject(err);
          }
        }).catch((err) => {
        console.log('Error retrieving request data : ' + err.message);
        return reject(err);
    });
  });
}