'use strict';

/**
 * @param {Response} response
 * @returns {string}
 */
function extractDetailsFromResponse(response) {
  const { status, text = '', body = {} } = response;
  const { message, error } = body;
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
