'use strict';

/**
 * @typedef {Object} ResponseBody
 * @property {string} [message]
 * @property {string} [code]
 * @property {Array} [errors]
 *
 * @typedef {Object} Response
 * @property {ResponseBody} [body]
 *
 * @typedef {Object} APIError
 * @property {Response} [response]
 * @property {string} [message]
 */

/**
 * @param {APIError} error
 *
 * @returns {string|undefined}
 */
function errorMessage(error) {
  if (
    error.response
    && error.response.body
    && error.response.body.code
    && error.response.body.message
  ) {
    const message = `${error.response.body.code} - ${error.response.body.message}`;

    if (error.response.body.errors) {
      const propertyErrors = error
        .response
        .body
        .errors
        .reduce((acc, current) => {
          if (current.property && current.message) {
            acc.push(`${current.property} "${current.message}"`);
          }
          return acc;
        }, []);

      if (propertyErrors.length > 0) {
        return `${message}: ${propertyErrors.join(', ')}`;
      }
    }

    return message;
  }

  return error.message;
}

/**
 * Signals that a problem occurred in a Yoti IDV call
 *
 * @class IDVError
 */
class IDVError extends Error {
  constructor(error) {
    super(errorMessage(error));

    this.name = this.constructor.name;
    /** @private */
    this.response = error.response || null;
  }

  /**
   * @returns {number|null}
   */
  getResponseStatusCode() {
    if (this.response && this.response.statusCode) {
      return this.response.statusCode;
    }
    return null;
  }

  /**
   * @returns {string|object|null} The parsed response body.
   */
  getResponseBody() {
    if (this.response && this.response.body) {
      return this.response.body;
    }
    return null;
  }
}

module.exports = IDVError;
