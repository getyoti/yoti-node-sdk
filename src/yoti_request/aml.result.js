'use strict'

const ON_PEP_LIST_KEY = 'on_pep_list';
const ON_FRAUD_LIST_KEY = 'on_fraud_list';
const ON_WATCH_LIST_KEY = 'on_watch_list';

exports.AmlResult = class AmlResult {

  constructor (rawResult) {
    console.log(rawResult);
    this.rawResult = rawResult;
    this.setAttributes(this.rawResult);
  }

  isOnPepList () {
    return this.isOnPepList;
  }

  isOnFraudList () {
    return this.isOnFraudList;
  }

  isOnWatchList () {
    return this.isOnWatchList;
  }

  setAttributes (rawResult) {
    this.checkAttributes(rawResult);
    this.isOnPepList = Boolean(rawResult['on_pep_list']);
    this.isOnFraudList = Boolean(rawResult['on_fraud_list']);
    this.isOnWatchList = Boolean(rawResult['on_watch_list']);
  }

  checkAttributes (rawResult) {

    if (!rawResult instanceof Array) {
      throw new Error('Result Data should be an array');
    }

    let expectedElements = ['on_pep_list', 'on_fraud_list', 'on_watch_list'];

    for (let key in expectedElements) {
      let attr = expectedElements[key];
      if (!rawResult.hasOwnProperty(attr)) {
        throw new Error('Missing key in the result ' + attr);
      }
    }
  }

  static checkAmlError (amlResult) {
    if (amlResult && amlResult.hasOwnProperty('errors')) {
      let code = amlResult['code'];
      let message = code + amlResult['errors'][0]['property'] + ' ' + amlResult['errors'][0]['message'];
      throw new Error(message);
    }
  }

  toString () {
    return JSON.stringify(
        {
          ON_PEP_LIST_KEY: this.isOnPepList(),
          ON_FRAUD_LIST_KEY: this.isOnFraudList(),
          ON_WATCH_LIST_KEY: this.isOnWatchList()
        });
  }
}