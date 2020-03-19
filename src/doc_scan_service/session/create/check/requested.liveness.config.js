'use strict';

const Validation = require('../../../../yoti_common/validation');

/**
 * The configuration applied when creating a LivenessCheck
 *
 * @class RequestedLivenessConfig
 */
class RequestedLivenessConfig {
  /**
   * @param {int} maxRetries
   *   The maximum number of retries allowed by the user
   *   for a given liveness check
   * @param {string} livenessType
   *   The type of the liveness check
   */
  constructor(maxRetries, livenessType) {
    Validation.isInteger(maxRetries, 'maxRetries');
    this.maxRetries = maxRetries;

    Validation.isString(livenessType, 'livenessType');
    this.livenessType = livenessType;
  }

  /**
   * @returns {Object} data for JSON.stringify()
   */
  toJSON() {
    return {
      max_retries: this.maxRetries,
      liveness_type: this.livenessType,
    };
  }
}

module.exports = RequestedLivenessConfig;
