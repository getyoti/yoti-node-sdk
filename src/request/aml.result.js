'use strict'

const constants = require('../yoti_common/constants');

exports.AmlResult = class AmlResult {

  /**
   * Check if all expected attributes are included in the result.
   *
   * @param rawResult
   */
  static checkAttributes (rawResult) {
    if (!rawResult instanceof Array) {
      throw new Error('Result Data should be an array');
    }

    let expectedElements = [
        constants.ON_PEP_LIST_ATTR,
        constants.ON_FRAUD_LIST_ATTR,
        constants.ON_WATCH_LIST_ATTR
    ];

    for (let x = 0; x < expectedElements.length; x++) {
      let attr = expectedElements[x];
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
    if (amlResult && amlResult.hasOwnProperty('errors') && amlResult.hasOwnProperty('code')) {
      let code = amlResult['code'];
      let message = code + amlResult['errors'][0]['property'] + ' ' + amlResult['errors'][0]['message'];
      throw new Error(message);
    }
  }
}