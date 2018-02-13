'use strict'

const ON_PEP_LIST_ATTR = 'on_pep_list';
const ON_FRAUD_LIST_ATTR = 'on_fraud_list';
const ON_WATCH_LIST_ATTR = 'on_watch_list';

exports.AmlResult = class AmlResult {
  constructor (rawResult) {
    this.rawResult = rawResult;

    this.setAttributes(this.rawResult);
  }

  /**
   * Check if user is a politically exposed person.
   *
   * @returns {exports.AmlResult.isOnPepList}
   */
  isOnPepList () {
    return this.isOnPepList;
  }

  /**
   * Check if user is on a fraud list.
   *
   * @returns {exports.AmlResult.isOnFraudList}
   */
  isOnFraudList () {
    return this.isOnFraudList;
  }

  /**
   * Check if user is on a watch list.
   *
   * @returns {exports.AmlResult.isOnWatchList}
   */
  isOnWatchList () {
    return this.isOnWatchList;
  }

  /**
   * Set attribute values.
   *
   * @param rawResult
   */
  setAttributes (rawResult) {
    AmlResult.checkAttributes(rawResult);
    this.isOnPepList = Boolean(rawResult[ON_PEP_LIST_ATTR]);
    this.isOnFraudList = Boolean(rawResult[ON_FRAUD_LIST_ATTR]);
    this.isOnWatchList = Boolean(rawResult[ON_WATCH_LIST_ATTR]);
  }

  /**
   * Check if all expected attributes are included in the result.
   *
   * @param rawResult
   */
  static checkAttributes (rawResult) {

    if (!rawResult instanceof Array) {
      throw new Error('Result Data should be an array');
    }

    let expectedElements = [ON_PEP_LIST_ATTR, ON_FRAUD_LIST_ATTR, ON_WATCH_LIST_ATTR];

    for (let key in expectedElements) {
      let attr = expectedElements[key];
      if (!rawResult.hasOwnProperty(attr)) {
        throw new Error('Missing attribute in the result ' + attr);
      }
    }
  }

  /**
   * Check if the response contains an error.
   *
   * @param amlResult
   */
  static checkAmlError (amlResult) {
    if (amlResult && amlResult.hasOwnProperty('errors')) {
      let code = amlResult['code'];
      let message = code + amlResult['errors'][0]['property'] + ' ' + amlResult['errors'][0]['message'];
      throw new Error(message);
    }
  }

  /**
   * Get result data.
   *
   * @returns {{}}
   */
  getData () {
    let data = {};
    data[ON_PEP_LIST_ATTR] = this.isOnPepList();
    data[ON_FRAUD_LIST_ATTR] = this.isOnFraudList();
    data[ON_WATCH_LIST_ATTR] = this.isOnWatchList();

    return data;
  }

  toString () {
    return JSON.stringify(this.getData());
  }
}