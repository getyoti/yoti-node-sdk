'use strict'

const httpRequest = require('../request');
const AmlResultClass = require('../request/aml.result').AmlResult;
const {Payload} = require('../request/payload');
const constants = require('../yoti_common/constants');
const ON_PEP_LIST_ATTR = constants.ON_PEP_LIST_ATTR;
const ON_FRAUD_LIST_ATTR = constants.ON_FRAUD_LIST_ATTR;
const ON_WATCH_LIST_ATTR = constants.ON_WATCH_LIST_ATTR;

const AmlResult = function(rawResult){
  this.isOnPepList = rawResult[ON_PEP_LIST_ATTR];
  this.isOnFraudList = rawResult[ON_FRAUD_LIST_ATTR];
  this.isOnWatchList = rawResult[ON_WATCH_LIST_ATTR];
}

AmlResult.prototype = {
  /**
   * Get result data.
   *
   * @returns {{}}
   */
  getData () {
    return {
      ON_PEP_LIST_ATTR: this.isOnPepList,
      ON_FRAUD_LIST_ATTR: this.isOnFraudList,
      ON_WATCH_LIST_ATTR: this.isOnWatchList
    };
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