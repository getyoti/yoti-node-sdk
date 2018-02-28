'use strict';

const constants = require('../yoti_common/constants');

function hasProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports.AmlResult = class AmlResult {
  /**
   * Check if all expected attributes are included in the result.
   *
   * @param rawResult
   */
  static checkAttributes(rawResult) {
    if (!(rawResult instanceof Object)) {
      throw new Error('Result Data should be an object');
    }

    const expectedElements = [
      constants.ON_PEP_LIST_ATTR,
      constants.ON_FRAUD_LIST_ATTR,
      constants.ON_WATCH_LIST_ATTR,
    ];

    for (let x = 0; x < expectedElements.length; x += 1) {
      const attr = expectedElements[x];
      if (!hasProperty(rawResult, attr)) {
        throw new Error(`Missing attribute in the result ${attr}`);
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
  static processAmlError(Error) {
    if (Error.response && Error.response.text) {
      const AmlError = JSON.parse(Error.response.text);
      if (hasProperty(AmlError, 'message') && hasProperty(AmlError, 'code')) {
        let message = `${AmlError.code} - ${AmlError.message}`;
        if (hasProperty(AmlError, 'errors') && AmlError.errors !== null) {
          message = `${message}: ${JSON.stringify(AmlError.errors)}`;
        }

        return message;
      }
    }
    return Error.message;
  }
};
