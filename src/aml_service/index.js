'use strict'

const yotiRequest = require('../yoti_request');
const AmlResultClass = require('../yoti_request/aml.result').AmlResult;
const Payload = require('../yoti_request/payload').Payload;

const AmlResultObj = function(rawResult){
  this.onPepList = rawResult['on_pep_list'];
  this.onFraudList = rawResult['on_fraud_list'];
  this.onWatchList = rawResult['on_watch_list'];
}

AmlResultObj.prototype = {
  /**
   * Check if user is a politically exposed person.
   *
   * @returns {exports.AmlResult.isOnPepList}
   */
  isOnPepList() {
    return this.onPepList;
  },

  /**
   * Check if user is on a fraud list.
   *
   * @returns {exports.AmlResult.isOnFraudList}
   */
  isOnFraudList () {
    return this.onFraudList;
  },

  /**
   * Check if user is on a watch list.
   *
   * @returns {exports.AmlResult.isOnWatchList}
   */
  isOnWatchList () {
    return this.onWatchList;
  },

  /**
   * Get result data.
   *
   * @returns {{}}
   */
  getData () {
    return {
      'on_pep_list': this.isOnPepList(),
      'on_fraud_list': this.isOnFraudList(),
      'on_watch_list': this.isOnWatchList()
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
    throw new Error('Error - AmlProfile should be an object of type Entity/AmlProfile');
  }

  let PayloadObj = new Payload(amlProfile.getData());

  return new Promise((resolve, reject) => {
    yotiRequest.makeRequest(httpMethod, endpoint, pem, appId, PayloadObj)
        .then(response => {
          if (response) {
            // This will throw an error if the error message is included in the response.
            AmlResultClass.checkAmlError(response.getParsedResponse());
            // Check if all expected attributes are included in the result.
            AmlResultClass.checkAttributes(response.getParsedResponse());
            return resolve(new AmlResultObj(response.getParsedResponse()));
          }
          console.log('Error getting response data');
          return reject(null);
        }).catch((err) => {
        console.log('Error retrieving request data : ' + err.message);
        return reject(err);
    });
  });
}