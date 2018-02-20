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
   * Process and extract the error message sent from Connect API
   *
   * @param Error
   *
   * @returns {string}
   */
  static processAmlError (Error) {
    if (Error.response && Error.response.text) {
      let AmlError = JSON.parse(Error.response.text);
      if (AmlError.hasOwnProperty('errors') && AmlError.hasOwnProperty('code')) {
        let message = AmlError.code + ' - ' + AmlError.errors[0]['message'];
        return message;
      }
    }

    return Error.message;
  }
}