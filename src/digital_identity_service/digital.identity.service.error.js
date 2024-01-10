'use strict';

/**
 * @typedef {Object} ResponseBody
 * @property {string} [message]
 * @property {string} [error]
 *
 * @typedef {Object} Response
 * @property {number} status
 * @property {string} text
 * @property {ResponseBody} [body]
 *
 * @param {Response} response
 * @returns {{status: number, reason: string, code:string|number}}
 */
function extractDetailsFromResponse(response) {
  const { status, text = '', body = {} } = response;
  const { message, error } = /** @type {{ message: string, error: string }} */ (body);
  const reason = message || text;

  return {
    status,
    reason,
    code: error,
  };
}

/**
 * Signals that a problem occurred in a Yoti Digital Identity Service
 *
 * @class DigitalIdentityServiceError
 */
class DigitalIdentityServiceError extends Error {
  constructor(error) {
    super(error.message);

    this.name = this.constructor.name;
    const { response } = error;
    if (response) {
      const { status, code, reason } = extractDetailsFromResponse(response);
      if (status) {
        this.status = status;
      }
      if (code) {
        this.code = code;
      }
      if (reason) {
        this.reason = reason;
      }
    }
  }
}

module.exports = DigitalIdentityServiceError;
